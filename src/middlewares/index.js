const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Token not provided' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

module.exports = { authenticate };