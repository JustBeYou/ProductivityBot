const express = require('express');
const bot = require('./bot-config');
const database = require('./db-config');
const functions = require('firebase-functions');
const jwt = require('jsonwebtoken');
const jwt_secret = functions.config().app.jwt_secret;
const userHelpers = require('./user-helpers');

const router = express.Router();

/**
 * @api {get} /user/webhook Verify user webhook
 * @apiName UserVerifyWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook verify route for user events
 */
router.get('/user/webhook', (req, res) => {
    return bot._verify(req, res); // use the same verification as for the messenger bot
});

/**
 * @api {post} /user/webhook Handle user events
 * @apiName UserWebhook
 * @apiGroup FacebookWebhooks
 * @apiDescription Facebook webhook for user events (likes, shares, posts, etc...)
 */
router.post('/user/webhook', (req, res) => {
    const user_app_id = req.body['entry'][0]['id'];

    database.ref('app_id_map/' + user_app_id).once('value', snapshot => {
        if (snapshot.exists()) {
            userHelpers.send_message(snapshot.val());
        }

        res.json({status: 'ok'});
    });
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
    database.ref('users/' + req.params.id).once('value', snapshot => {
        if (snapshot.exists()) {
            var token = jwt.sign({id: req.params.id}, jwt_secret);
            res.json({activation_token: token});
        }
        else {
            res.json({activation_token: 'invalid'});
        }
    });
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
