const express = require('express');
const bot = require('./bot-config');

const router = express.Router();

router.get('/user/webhook', (req, res) => {
    console.log('GET /user/webhook', req.body);
    return bot._verify(req, res); // use the same verification as for the messenger bot
});

router.get('/user/webhook', (req, res) => {
    console.log('POST /user/webhook', req.body);
    res.send({status: 'ok'});
});

module.exports = router;
