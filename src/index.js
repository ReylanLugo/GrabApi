//Load modules
require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const cors = require('cors');
//Load middlewares
const { authenticate } = require('./middlewares');
//Load routes
const userRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 7000;
const secretKey = 'your_secret_key';
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/v1/users', authenticate, userRoutes);
app.use('/api/v1/auth', authRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
