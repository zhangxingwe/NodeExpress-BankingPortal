const express = require('express');
const router = express.Router();
const data = require('../data.js');

const { accounts, writeJSON } =  data;

router.get('/transfer', (req, res) => {
    res.render(
        'transfer',
        {
            user: users[0]
        }
    );
});

router.post('/transfer', (req, res) => {

    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance + req.body.amount);
    parseInt(req.body.amount, 10);

    writeJSON();
    
    res.render('transfer', {message: 'Transfer Completed'});
});

router.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));
router.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);

    writeJSON();

    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});

module.exports = router;