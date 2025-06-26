const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoute = require('./routes/auth');
const accountRoute = require('./routes/account');
const { authenticateJWT: middleware } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/balance', middleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'balance.html'));
});

app.use('/api/auth', authRoute);
app.use('/api/account', accountRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});