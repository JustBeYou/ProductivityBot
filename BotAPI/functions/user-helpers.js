const database = require('./db-config');
const bot = require('./bot-config');

function activate_user(db_id, app_id, page_id) {
    console.log('activate', db_id, app_id, page_id);
    database.ref('users/' + db_id).set({
        activated: true,
        facebook_user_app_id: app_id,
        facebook_user_page_id: page_id,
    });

    var temp_obj_1 = {};
    temp_obj_1[app_id] = db_id;
    database.ref('app_id_map/').set(temp_obj_1);

    var temp_obj_2 = {};
    temp_obj_2[page_id] = db_id;
    database.ref('page_id_map/').set(temp_obj_2);
}

async function send_message(db_id) {
    const status_snapshot = await database.ref('users/' + db_id + '/status').once('value');
    const status = status_snapshot.val();

    if (status === false) {
        console.log("the bot is turned off for user", db_id);
        return ;
    }

    const page_id_snapshot = await database.ref('users/' + db_id + '/facebook_user_page_id').once('value');

    if (page_id_snapshot.exists()) {
        const page_id = page_id_snapshot.val();

        const message_snapshot = await database.ref('users/' + db_id + '/message').once('value');
        const message = message_snapshot.val();

        console.log('sending message to', page_id);
        bot.sendMessage(page_id, {text: message});
    } else {
        console.log("user is probabily not activated", db_id);
    }
}

module.exports = {
    activate_user: activate_user,
    send_message: send_message
};
