const express = require('express');
const database = require('./db-config');
const functions = require('firebase-functions');
const userHelpers = require('./user-helpers');
const admin = require('firebase-admin');

const router = express.Router();

admin.initializeApp({
    apiKey: functions.config().app.api_key,
    authDomain: 'facebookwarninguh.firebaseapp.com',
    databaseURL: 'https://facebookwarninguh.firebaseio.com/',
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
    });

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
 * @apiSuccess {String}
 */
router.post('/user/activate', (req, res) => {
    res.json({status: 'not implemented'});
});

router.get('/user/activate', (req, res) => {
    res.json({status: 'not implemented'});
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
    const id = req.params.id;

    database.ref('users/' + id + '/facebook_user_app_id').once('value', snapshot => {
        if (!snapshot.exists()) {
            admin.auth().getUser(id)
                .then(user => {
                    var user_app_id = user.providerData[0].uid;
                    userHelpers.new_user(id, user_app_id);
                    return null;
                });

        }
    });

    res.json({status: 'ok'});
});

module.exports = router;
