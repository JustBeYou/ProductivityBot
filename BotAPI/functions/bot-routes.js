const express = require('express');
const bot = require('./bot-config');

const router = express.Router();

router.get('/bot/webhook', (req, res) => {
    console.log('GET /bot/webhook', req.body);
    return bot._verify(req, res);
});

router.post('/bot/webhook', (req, res) => {
    console.log('POST', req.body, req.body['entry'][0]['changed_fields'], req.body['entry'][0]['messaging']);
    res.send({status: 'ok'});
});

module.exports = router;
