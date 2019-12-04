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
  authDomain:'facebookwarninguh.firebaseapp.com',
  databaseURL: 'https://facebookwarninguh.firebaseio.com/'
});

bot.on('message', (payload, reply) => {
    const text      = payload.message.text;
    const sender_id = payload.sender.id;

    console.log('MESSAGE FROM', sender_id, 'WITH TEXT', text);
    var words = text.split(' ');
    if (words[0] === 'token') {
        // verify activation token
        try {
            var decoded = jwt.verify(words[1], jwt_secret);
            var id = decoded['id'];
            admin.auth().getUser(id)
                .then(user => {
                    var user_app_id = user.providerData[0].uid;
                    console.log('VERIFIED TOKEN', decoded, user_app_id, sender_id);
                    userHelpers.activate_user(id, user_app_id, sender_id);

                    reply({ text: 'Activare realizata cu succes.'}, (err, info) => {
                        if (err) {
                            console.log('[ERROR] Bot could not reply', err);
                        }
                    });

                    return null;
                })
                .catch(error => {
                    console.log('[ERROR] User not found', error);
                });
        } catch(err) {
            console.log('[ERROR] Invalid token', err);
            reply({ text: 'Codul este invalid'}, (err, info) => {
                if (err) {
                    console.log('[ERROR] Bot could not reply', err);
                }
            });
        }
    } else {
        reply({ text: 'Nu te inteleg...'}, (err, info) => {
            if (err) {
                console.log('[ERROR] Bot could not reply', err);
            }
        });
    }
});

/**
 * @api {get} /bot/webhook Verify bot webhook
 * @apiName BotVerifyWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook verify route for messenger bot
 */
router.get('/bot/webhook', (req, res) => {
    console.log('verified', req.body);
    return bot._verify(req, res);
});

/**
 * @api {post} /bot/webhook Handle bot events
 * @apiName BotWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook, here arrives all the events about the messenger bot
 */
router.post('/bot/webhook', (req, res) => {
    console.log('message', req.body);
    bot._handleMessage(req.body);
    res.json({status: 'ok'});
});

module.exports = router;
