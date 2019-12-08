'use strict;';

const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bot = require('./bot-config');

const app = express();

app.use(cors());
app.use(bodyParser.json({
    verify: bot.getVerifySignature(
        functions.config().facebook.app_secret,
    ),
}));

app.use((req, res, next) => {
    var Console = console;
    Console.log('REQUEST', req.url, req.body);
    if (req.body['entry'] !== undefined) {
        Console.log('PAYLOAD', req.body['entry'][0]['changed_fields']);
    }

    next();
});

app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(require('./user-routes'));
app.use(require('./bot-routes'));

/* Route to check if the service is running */
app.get('/status', (req, res) => {
    res.send({status: 'running fine'});
});

exports.app = functions.https.onRequest(app);
