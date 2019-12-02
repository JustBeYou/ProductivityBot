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

app.get('/webhook', (req, res) => {
    console.log("GET", req.body);
    res.send('{"message" : "ok"}');
});

app.post('/webhook', (req, res) => {
    console.log("POST", req.body, req.body['entry'][0]['changed_fields'], req.body['entry'][0]['messaging']);
    res.send('{"message" : "ok"}');
});

app.get('/status', (req, res) => {
    console.log("Running fine.");
    res.send("Running fine.");
});

exports.app = functions.https.onRequest(app);
