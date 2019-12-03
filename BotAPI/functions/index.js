'use strict;'

const functions = require('firebase-functions');
const MessengerBot = require('messenger-bot');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
var bot = new MessengerBot({
  token: functions.config().facebook.page_access_token,
  verify: functions.config().facebook.verify_token,
  app_secret: functions.config().facebook.app_secret
});
app.use(bodyParser.json());

/* Messenger bot webhook */
app.get('/bot/webhook', (req, res) => {
    console.log('GET /bot/webhook', req.body);
    return bot._verify(req, res);
});

app.post('/bot/webhook', (req, res) => {
    console.log('POST', req.body, req.body['entry'][0]['changed_fields'], req.body['entry'][0]['messaging']);
    res.send({status: 'ok'});
});

/* User webhook */
app.get('/user/webhook', (req, res) => {
    console.log('GET /user/webhook', req.body);
    return bot._verify(req, res); // use the same verification as for the messenger bot
});

app.get('/user/webhook', (req, res) => {
    console.log('POST /user/webhook', req.body);
    res.send({status: 'ok'});
});

/* Route to check if the service is running */
app.get('/status', (req, res) => {
    res.send('Running fine.');
});

exports.app = functions.https.onRequest(app);
