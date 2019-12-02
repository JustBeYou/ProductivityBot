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
//app.use('/webhook', bot.middleware());
app.get('/webhook', (req, res) => {
    console.log("GET", req.body);
    res.send('{"message" : "ok"}');
});

app.post('/webhook', (req, res) => {
    console.log("POST", req.body, req.body['entry'][0]['changed_fields'], req.body['entry'][0]['messaging']);

    var id = 3548808395134765;
    var message = {text: 'salut cumetre'};
    console.log('SEND', id, message);

    bot.sendMessage(id, message, (err, info) => {
        if (err) {
            console.log("error:", err);
        }
        console.log(info);
    });
    res.send('{"message" : "ok"}');
});

bot.on('message', (payload, reply, actions) => {
    console.log("message");

    //reply({ text: 'hey!'}, (err, info) => {
    //    if (err) {
    //        console.log("Failed to answer");
    //    }
    //});
});

app.get('/status', (req, res) => {
    console.log("Running fine.");
    res.send("Running fine.");
});

exports.app = functions.https.onRequest(app);
