const functions = require('firebase-functions');
const Botly = require('botly');

// TODO: renew token, it expires everyday in development mode I think
const bot = new Botly({
    accessToken: functions.config().facebook.page_access_token,
    verifyToken: functions.config().facebook.verify_token,
    //app_secret: functions.config().facebook.app_secret,
});

module.exports = bot;
