const express = require('express');
const bot = require('./bot-config');
//const functions = require('firebase-functions');
//const userHelpers = require('./user-helpers');
const database = require('./db-config');
const router = express.Router();

//const base_url = 'https://us-central1-facebookwarninguh.cloudfunctions.net/app/';
const login_url = 'https://facebookwarninguh.firebaseapp.com/';

bot.on('message', (sender_id, message, data) => {
    const text = data.text;

    database.ref('page_id_map/' + sender_id).once('value', snapshot => {
        if (!snapshot.exists()) {
            bot.sendButtons({
                id: sender_id,
                text: 'Asocieaza-ti contul :D',
                buttons: [bot.createAccountLinkButton(login_url)],
            });
        }
        else {
            if (text === 'snooze') {
                bot.sendText({
                    id: sender_id,
                    text: 'Okey',
                });
            }
            else {
                bot.sendText({
                    id: sender_id,
                    text: 'Nu te inteleg...',
                });
            }
        }
    });
});

router.use('/bot/webhook', bot.router());

module.exports = router;
