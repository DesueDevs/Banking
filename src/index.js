const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const accountRoute = require('./routes/account');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRoute);
app.use('/api/account', accountRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});