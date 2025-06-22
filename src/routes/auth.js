const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../database');
const jwt = require('jsonwebtoken');
const { Logging } = require('../logging');
const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Input validation
    if (!firstname || !lastname || !email || !password) {
        Logging('accountCreation', 'error', 'Missing required fields for account creation', req.ip, 'failure');
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (!email.includes('@') || !email.includes('.') || email.includes(' ')) {
        Logging('accountCreation', 'error', `Invalid email format: ${email}`, req.ip, 'failure');
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const encryptedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Database logic
    const newAccount = {
        firstname,
        lastname,
        email,
        password: encryptedPassword
    };

    db.addAccount(newAccount);

    Logging('accountCreation', 'info', `Account creation under the email ${email}`, req.ip, 'success')
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    const { email, password } = req.query;

    //TODO: implement some form of ip tracking to prevent brute force attacks

    // Input validation
    if (!email || !password) {
        Logging('accountLogin', 'error', 'Email and password are required for login', req.ip, 'failure');
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const encryptedPassword = crypto.createHash('sha256').update(password + email.substring(0,5)).digest('hex');
    const account = db.findAccountByEmailAndPassword(encryptedPassword);

    if (!account) {
        Logging('accountLogin', 'warn', `Failed login attempt for email: ${email}`, req.ip, 'failure');
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const sessionId = crypto.randomUUID();
    const token = jwt.sign({sessionId}, JWT_SECRET, { expiresIn: '3h' });

    db.addTokenValidation(token, {
        email: account.email,
        firstname: account.firstname,
        lastname: account.lastname
    });

    // Set JWT as httpOnly cookie
    res.cookie('sso', token, { httpOnly: true, secure: false });
    res.redirect('/info')

    Logging('accountLogin', 'info', `Successful login for email: ${email}`, req.ip, 'success', {
        sessionId,
        token
    });
});

module.exports = router;