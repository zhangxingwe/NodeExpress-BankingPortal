const fs = require('fs');
const path = require('path');
const express = require('express');
const data = require('./data.js');

const{ accounts, users, writeJSON} = data;
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');


const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.urlencoded({ extended: false }));

// const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
// const accounts = JSON.parse(accountData);

// const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');
// const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render(
        'index',
        {
            title: 'Account Summary', accounts
        }
    );
});

app.use('/account', accountRoutes);

// app.get('/savings', (req, res) => {
//     res.render(
//         'account',
//         {
//             account: accounts.savings
//         }
//     );
// });

// app.get('/checking', (req, res) => {
//     res.render(
//         'account',
//         {
//             account: accounts.checking
//         }
//     );
// });

// app.get('/credit', (req, res) => {
//     res.render(
//         'account',
//         {
//             account: accounts.credit
//         }
//     );
// });

app.get('/profile', (req, res) => {
    res.render(
        'profile',
        {
            user: users[0]
        }
    );
});

app.use('/services', servicesRoutes);

// app.get('/transfer', (req, res) => {
//     res.render(
//         'transfer',
//         {
//             user: users[0]
//         }
//     );
// });

// app.post('/transfer', (req, res) => {

//     accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
//     accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance + req.body.amount);
//     parseInt(req.body.amount, 10);

//     // const accountsJSON = JSON.stringify(accounts, null, 4);
//     // fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
//     writeJSON();
    
//     res.render('transfer', {message: 'Transfer Completed'});
// });

// app.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));
// app.post('/payment', (req, res) => {
//     accounts.credit.balance -= req.body.amount;
//     accounts.credit.available += parseInt(req.body.amount, 10);

//     // const accountsJSON = JSON.stringify(accounts, null, 4)
//     // fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');
//     writeJSON();

//     res.render('payment', {message: 'Payment Successful', account: accounts.credit});
// });

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
