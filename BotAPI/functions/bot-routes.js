const express = require('express');
const bot = require('./bot-config');

const router = express.Router();

/**
 * @api {get} /bot/webhook Verify bot webhook
 * @apiName BotVerifyWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook verify route for messenger bot
 */
router.get('/bot/webhook', (req, res) => {
    console.log('GET /bot/webhook', req.body);
    return bot._verify(req, res);
});

/**
 * @api {post} /bot/webhook Handle bot events
 * @apiName BotWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook, here arrives all the events about the messenger bot
 */
router.post('/bot/webhook', (req, res) => {
    console.log('POST', req.body, req.body['entry'][0]['changed_fields'], req.body['entry'][0]['messaging']);
    res.send({status: 'ok'});
});

module.exports = router;
