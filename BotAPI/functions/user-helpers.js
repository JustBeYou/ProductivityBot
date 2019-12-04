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

function send_message(db_id) {
    database.ref('users/' + db_id + '/facebook_user_page_id').once('value', snapshot => {
        if (snapshot.exists()) {
            console.log('sending message to', snapshot.val());
            bot.sendMessage(snapshot.val(), {text: 'Test message'}); // TODO: read custom message from db
        } else {
            console.log("user is probabily not activated", db_id);
        }
    });
}

module.exports = {
    activate_user: activate_user,
    send_message: send_message
};
