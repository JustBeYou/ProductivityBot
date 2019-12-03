How registration should proceed
===
1. Go to the web interface, authorize the facebook application.
2. After authorization a new entry should be created in the database for the new user, containing the `id` and `facebook_oauth_id`.
3. Make a POST request to `https://<backend url>/user/<id>/activate` in order to announce the new user created. The server will return a JSON message containing the activation token. `{'activation_token': '<some string here>'}` The backend must also obtain the scoped id of the user in the app and store it in the database.
4. Display the activation token somewhere on the interface and let the user message it to the bot.
5. The message should raise a webhook from facebook to `https://<backend url>/bot/webhook` containing the actual message and the scoped id of the sender.
6. Based on activation token, search the user in the database and write the scoped id from the message.

