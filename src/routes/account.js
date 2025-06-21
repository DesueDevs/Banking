const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../database');
const { Logging } = require('../logging');
const { authenticateJWT } = require('../middleware');

router.get('/accountBalance', authenticateJWT, (req, res) => {
    const { sso } = req.sso;
    const { accountNum } = req.query;

    const account = db.findAccountByToken(sso); 

    const foundAccountNum = Array.isArray(account.accounts) && account.accounts.some(element => element.accountNum === accountNum);
    if (!foundAccountNum) {
        Logging('general', 'warn', `Account number ${accountNum} was requested by ${account.email} but this account number isnt under their account.`, req.ip, 'failure');
        return res.status(403).json({ error: 'Account number does not belong to this account' });
    }

    if (!account) {
        // Could log at a later stage if needed for example if a attempt to mass access accounts is detected
        return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ balance: account.balance || 0 });
});

router.post('/deposit', authenticateJWT, (req, res) => {
    const { sso } = req.sso;
    const { accountNum, amount } = req.json();

    const account = db.findAccountByToken(sso);

    if (!account) {
        Logging('deposit', 'warn', `Deposit attempt for non-existing account with token: ${sso}`, req.ip, 'failure');
        return res.status(404).json({ error: 'Account not found' });
    }
    const foundAccountNum = Array.isArray(account.accounts) && account.accounts.some(element => element.accountNum === accountNum);
    if (!foundAccountNum) {
        Logging('deposit', 'warn', `Deposit attempt for account number ${accountNum} which does not belong to the account with email: ${account.email}`, req.ip, 'failure');
        return res.status(403).json({ error: 'Account number does not belong to this account' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
        Logging('deposit', 'error', `Invalid deposit amount: ${amount}`, req.ip, 'failure');
        return res.status(400).json({ error: 'Invalid deposit amount' });
    }

    // Update balance
    account.balance = (account.balance || 0) + amount;
    db.addAccount(account);

    Logging('deposit', 'info', `Deposit of ${amount} successful for account with email: ${account.email}`, req.ip, 'success');
    res.json({ message: 'Deposit successful', balance: account.balance });
});

router.post('/withdraw', authenticateJWT, (req, res) => {
    const { sso } = req.sso;
    const { accountNum, amount } = req.json();

    const account = db.findAccountByToken(sso);
    if (!account) {
        Logging('withdrawal', 'warn', `Withdrawal attempt for non-existing account with token: ${sso}`, req.ip, 'failure');
        return res.status(404).json({ error: 'Account not found' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
        Logging('withdrawal', 'error', `Invalid withdrawal amount: ${amount}`, req.ip, 'failure');
        return res.status(400).json({ error: 'Invalid withdrawal amount' });
    }

    // Update balance
    account.balance = (account.balance || 0) - amount;
    db.addAccount(account);

    Logging('withdrawal', 'info', `Withdrawal of ${amount} successful for account with email: ${account.email}`, req.ip, 'success');
    res.json({ message: 'Withdrawal successful', balance: account.balance });
});