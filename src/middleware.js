const jwt = require('jsonwebtoken');
const { Logging } = require('../logging');
const JWT_SECRET = process.env.JWT_SECRET
// TODO: Implement better middleware for JWT authentication

function authenticateJWT(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        Logging('authentication', 'warn', 'Unauthorized access attempt without token', req.ip, 'failure');
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        // Logging here would be redundant as logging aleady happens when the token is created (login route in auth.js)
        req.sso = jwt.verify(token, JWT_SECRET);
        next();
    }catch (err) {
        Logging('authentication', 'error', `Invalid token: ${err.message}`, req.ip, 'failure');
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = {
    authenticateJWT
};