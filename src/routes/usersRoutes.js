const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const prisma = new PrismaClient();

// GET all users with pagination
router.get('/', async (req, res) => {
    const { page = 1, count = 9 } = req.query;
    const total = await prisma.user.count();
    res.set('X-Total-Count', total);
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');

    if (total === 0) {
        return res.json([]);
    }

    if (page > Math.ceil(total / count)) {
        return res.status(404).json({ error: 'Page not found' });
    }

    const users = await prisma.user.findMany({
        skip: (page - 1) * count,
        take: Number(count)
    });

    res.json(users);
});
// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Invalid user ID' });
    }
});
// PUT update user
router.put('/:id',[
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: updates
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Invalid user ID or bad request' });
    }
});
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: { id: Number(req.params.id) }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid user ID' });
    }
});

module.exports = router;