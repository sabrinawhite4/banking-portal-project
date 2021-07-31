const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const gradient = require('gradient-string');
const { accounts, users, writeJSON } = require('./data.js');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.get('/profile', (req, res) => {
    res.render('profile', {user:users[0]});
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', (req, res) => {
  res.render('index', {title: 'Account Summary', accounts: accounts});
});

app.listen(PORT, () => {
    console.log(gradient.instagram(`PS Project Running on port ${PORT}!`));
});