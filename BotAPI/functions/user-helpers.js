const database = require('./db-config');
const bot = require('./bot-config');

function activate_user(db_id, page_id) {
    database.ref('users/' + db_id).update({
        activated: true,
        facebook_user_page_id: page_id,
    });

    var temp_obj = {};
    temp_obj[page_id] = db_id;
    database.ref('page_id_map/').update(temp_obj);
}

function new_user(db_id, app_id) {
    database.ref('users/' + db_id).update({
        facebook_user_app_id: app_id,
    });

    var temp_obj = {};
    temp_obj[app_id] = db_id;
    database.ref('app_id_map/').update(temp_obj);

}

async function send_message(db_id) {
    const status_snapshot = await database.ref('users/' + db_id + '/status').once('value');
    const status = status_snapshot.val();

    if (status === false) {
        return ;
    }

    const page_id_snapshot = await database.ref('users/' + db_id + '/facebook_user_page_id').once('value');

    if (page_id_snapshot.exists()) {
        const page_id = page_id_snapshot.val();

        const message_snapshot = await database.ref('users/' + db_id + '/message').once('value');
        const message = message_snapshot.val();

        bot.sendText({
            id: page_id,
            text: message,
        });
    }
}

module.exports = {
    new_user,
    activate_user,
    send_message,
};
