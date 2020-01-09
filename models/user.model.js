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
    changeProfile: async entity => {
        await db.load(`update user set name = '${entity.name}', email = '${entity.email}', phone = '${entity.phone}', DOB ='${entity.DOB}' where user_id = '${entity.user_id}'`);
    },

    changePassword: async(newPassword, user_id) => {
        await db.load(`update user set password = '${newPassword}' where user_id = '${user_id}'`);
    },

    getUserById: async user_id => {
        const rows = await db.load(`select * from user where user_id = '${user_id}'`);
        console.log("RR");
        console.log(rows);
        console.log(user_id);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },
}