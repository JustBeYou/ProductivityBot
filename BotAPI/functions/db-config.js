const firebase = require('firebase');
const functions = require('firebase-functions');

firebase.initializeApp({
  apiKey: functions.config().app.api_key,
  authDomain:'facebookwarninguh.firebaseapp.com',
  databaseURL: 'https://facebookwarninguh.firebaseio.com/'
});

var database = firebase.database();

module.exports = database;
