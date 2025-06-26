const jwt = require('jsonwebtoken');
const { Logging } = require('./logging');
const JWT_SECRET = process.env.JWT_SECRET
// TODO: Implement better middleware for JWT authentication

function authenticateJWT(req, res, next) {
    // Use the correct cookie name and handle missing cookies gracefully
    const token = req.cookies && req.cookies.sso;
    if (!token) {
        Logging('authentication', 'warn', 'Unauthorized access attempt without token', req.ip, 'failure');
        return res.redirect('/login-page');
    }
    try {
        req.sso = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        Logging('authentication', 'error', `Invalid token: ${err.message}`, req.ip, 'failure');
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = {
    authenticateJWT
};