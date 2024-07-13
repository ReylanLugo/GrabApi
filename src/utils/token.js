const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, secretKey, { expiresIn: '24h' });
};

module.exports = { generateToken };