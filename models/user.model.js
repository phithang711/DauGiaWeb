const db = require('../utils/database.util');

module.exports = {
    all: _ => db.load(`select * from user`),
    add: entity => db.add(entity, 'user'),

    checkUsernameIsExisted: async email => {
        const rows = await db.load(`select * from user where email = '${email}'`);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },
    checkValidated: async(email, password) => {
        const rows = await db.load(`select * from user where email = '${email}' and password = '${password}'`);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },
    remove: async function(email) {
        try {
            await db.load(`DELETE FROM user WHERE (email)="${email}"`);
        } catch {
            return false;
        }

        return true;

    },
    upgrade: async function(email) {
        try {
            await db.load(`UPDATE user SET type= 1 WHERE email = '${email}'`);
        } catch {
            return false;
        }

        return true;

    },
    downgrade: async function(email) {
        try {
            await db.load(`UPDATE user SET type= 0 WHERE email = '${email}'`);
        } catch {
            return false;
        }

        return true;

    },
}