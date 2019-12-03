const functions = require('firebase-functions');
const messengerBot = require('messenger-bot');

const bot = new messengerBot({
  token: functions.config().facebook.page_access_token,
  verify: functions.config().facebook.verify_token,
  app_secret: functions.config().facebook.app_secret
});

module.exports = bot;
