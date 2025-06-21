const fs = require('fs');
const path = require('path');
const accountsFile = path.join(__dirname, '../data/accounts.json');

let accounts = [];
let tokenData = [];
if (fs.existsSync(accountsFile)) {
    const data = fs.readFileSync(accountsFile, 'utf8');
    accounts = data ? JSON.parse(data) : [];
}

function addAccount(account) {
    accounts.push(account);
    fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2));
}
function addTokenValidation(token, userData) {
    tokenData.push({token, userData});
}

//Finding accounts
function findAccountByEmail(email) {
    return accounts.find(acc => acc.email === email);
}
function findAccountByPassword(password) {
    return accounts.find(acc => acc.password === password);
}
function findAccountByEmailAndPassword(email, password) {
    return accounts.find(acc => acc.email === email && acc.password === password);
}
function findAccountByToken(token) {
    const tokenEntry = tokenData.find(entry => entry.token === token);
    if (tokenEntry) {
        return accounts.find(acc => acc.email === tokenEntry.userData.email);
    }
    return null;
}

module.exports = {
    addAccount,
    addTokenValidation,

    findAccountByEmail,
    findAccountByPassword,
    findAccountByEmailAndPassword,
    findAccountByToken,
    getAccounts: () => accounts,
};