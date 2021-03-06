define({ "api": [
  {
    "type": "get",
    "url": "/bot/webhook",
    "title": "Verify bot webhook",
    "name": "BotVerifyWebhook",
    "group": "FacebookWebhooks",
    "description": "<p>Facebook webhook verify route for messenger bot</p>",
    "version": "0.0.0",
    "filename": "BotAPI/functions/bot-routes.js",
    "groupTitle": "FacebookWebhooks"
  },
  {
    "type": "post",
    "url": "/bot/webhook",
    "title": "Handle bot events",
    "name": "BotWebhook",
    "group": "FacebookWebhooks",
    "description": "<p>Facebook webhook, here arrives all the events about the messenger bot</p>",
    "version": "0.0.0",
    "filename": "BotAPI/functions/bot-routes.js",
    "groupTitle": "FacebookWebhooks"
  },
  {
    "type": "get",
    "url": "/user/webhook",
    "title": "Verify user webhook",
    "name": "UserVerifyWebhook",
    "group": "FacebookWebhooks",
    "description": "<p>Facebook webhook verify route for user events</p>",
    "version": "0.0.0",
    "filename": "BotAPI/functions/user-routes.js",
    "groupTitle": "FacebookWebhooks"
  },
  {
    "type": "post",
    "url": "/user/webhook",
    "title": "Handle user events",
    "name": "UserWebhook",
    "group": "FacebookWebhooks",
    "description": "<p>Facebook webhook for user events (likes, shares, posts, etc...)</p>",
    "version": "0.0.0",
    "filename": "BotAPI/functions/user-routes.js",
    "groupTitle": "FacebookWebhooks"
  },
  {
    "type": "post",
    "url": "/user/:id/activate",
    "title": "Activate user account",
    "name": "UserActivate",
    "group": "User",
    "description": "<p>Return activation token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id from the database</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activation_token",
            "description": "<p>The token to be sent to the bot</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "BotAPI/functions/user-routes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/:id/changed",
    "title": "Notify that settings changed",
    "name": "UserChanged",
    "group": "User",
    "description": "<p>Notify the bot handler that the settings changed</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id from database</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>ok or fail</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "BotAPI/functions/user-routes.js",
    "groupTitle": "User"
  }
] });
