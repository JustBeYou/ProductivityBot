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
    res.json({status: 'ok'});
});

/**
 * @api {post} /user/:id/activate Activate user account
 * @apiName UserActivate
 * @apiGroup User
 * @apiDescription Return activation token
 *
 * @apiParam {String} id User id from the database
 *
 * @apiSuccess {String} activation_token The token to be sent to the bot
 */
router.post('/user/:id/activate', (req, res) => {
    res.json({activation_token: 'not implemented'});
});

/**
 * @api {post} /user/:id/changed Notify that settings changed
 * @apiName UserChanged
 * @apiGroup User
 * @apiDescription Notify the bot handler that the settings changed
 *
 * @apiParam {String} id User id from database
 *
 * @apiSuccess {String} status ok or fail
 */
router.post('/user/:id/changed', (req, res) => {
    res.json({status: 'not implemented'});
});

module.exports = router;
