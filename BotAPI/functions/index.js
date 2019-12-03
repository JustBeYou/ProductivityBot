'use strict;'

const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(require('./user-routes'));
app.use(require('./bot-routes'));

/* Route to check if the service is running */
app.get('/status', (req, res) => {
    res.send({status: 'running fine'});
});

exports.app = functions.https.onRequest(app);
