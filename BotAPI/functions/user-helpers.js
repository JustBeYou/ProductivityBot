const database = require('./db-config');
const bot = require('./bot-config');
const retry = require('async-retry');

const dashboard_url = 'https://facebookwarninguh.firebaseapp.com/';

async function activate_users() {
    await retry(async () => {
        const tokens_snapshot = await database.ref('activation_tokens/').once('value');
        if (!tokens_snapshot.exists()) {
            throw new Error('need to retry');
        }
        database.ref('activation_tokens/').remove();

        tokens_snapshot.forEach(token_entry => {
            const facebook_token = token_entry.key;
            const user_id = token_entry.val();

            bot.getPSID(facebook_token, (err, account) => {
                const page_id = account.recipient;
                activate_user(user_id, page_id);

                bot.sendButtons({
                    id: page_id,
                    text: 'Iti poti configura optiunile aici :D',
                    buttons: [bot.createWebURLButton('Tablou configurare', dashboard_url)],
                });
            });
        });

        return Promise.resolve(null);
    }, {
        retries: 10,
        minTimeout: 1000,
        maxTimeout: 5000,
    });
}


function activate_user(db_id, page_id) {
    database.ref('users/' + db_id).update({
        activated: true,
        facebook_user_page_id: page_id,
    });

    var temp_obj = {};
    temp_obj[page_id] = db_id;
    database.ref('page_id_map/').update(temp_obj);
}

async function new_user(db_id, app_id) {
    database.ref('users/' + db_id).update({
        facebook_user_app_id: app_id,
    });

    var temp_obj = {};
    temp_obj[app_id] = db_id;
    database.ref('app_id_map/').update(temp_obj);

    const account_linking_token_snapshot = await database.ref('users/' + db_id + '/facebook_account_linking_token').once('value');
    const account_linking_token = account_linking_token_snapshot.val();
    temp_obj = {};
    temp_obj[account_linking_token] = db_id;
    database.ref('activation_tokens/').update(temp_obj);
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
    activate_users,
    send_message,
};
