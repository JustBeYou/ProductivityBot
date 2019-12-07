const express = require('express');
const bot = require('./bot-config');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const jwt_secret = functions.config().app.jwt_secret;
const userHelpers = require('./user-helpers');
const router = express.Router();

admin.initializeApp({
    apiKey: functions.config().app.api_key,
    authDomain: 'facebookwarninguh.firebaseapp.com',
    databaseURL: 'https://facebookwarninguh.firebaseio.com/',
});

bot.on('message', (payload, reply) => {
    const text = payload.message.text;
    const sender_id = payload.sender.id;

    var words = text.split(' ');
    if (words[0] === 'token') {
        // verify activation token
        try {
            var decoded = jwt.verify(words[1], jwt_secret);
            var id = decoded['id'];
            admin.auth().getUser(id)
                .then(user => {
                    var user_app_id = user.providerData[0].uid;
                    userHelpers.activate_user(id, user_app_id, sender_id);

                    reply({text: 'Activare realizata cu succes.'});

                    return null;
                });
        }
        catch (err) {
            reply({text: 'Codul este invalid.'});
        }
    }
    else {
        reply({text: 'Nu te inteleg...'});
    }
});

/**
 * @api {get} /bot/webhook Verify bot webhook
 * @apiName BotVerifyWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook verify route for messenger bot
 */
router.get('/bot/webhook', (req, res) => {
    return bot._verify(req, res);
});

/**
 * @api {post} /bot/webhook Handle bot events
 * @apiName BotWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook, here arrives all the events about the messenger bot
 */
router.post('/bot/webhook', (req, res) => {
    bot._handleMessage(req.body);
    res.json({status: 'ok'});
});

module.exports = router;
