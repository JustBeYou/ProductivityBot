const express = require('express');
const bot = require('./bot-config');

const router = express.Router();

/**
 * @api {get} /user/webhook Verify user webhook
 * @apiName UserVerifyWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook verify route for user events
 */
router.get('/user/webhook', (req, res) => {
    console.log('GET /user/webhook', req.body);
    return bot._verify(req, res); // use the same verification as for the messenger bot
});

/**
 * @api {post} /user/webhook Handle user events
 * @apiName UserWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook for user events (likes, shares, posts, etc...)
 */
router.get('/user/webhook', (req, res) => {
    console.log('POST /user/webhook', req.body);
    res.send({status: 'ok'});
});

module.exports = router;
