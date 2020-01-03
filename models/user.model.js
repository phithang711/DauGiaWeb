const db = require('../utils/database.util');

module.exports = {
    all: _ => db.load(`select * from user`),
    add: entity => db.add(entity, 'user'),
    
    checkUsernameIsExisted: async email => {
        const rows = await db.load(`select * from user where email = '${email}'`);
        if(rows.length > 0) {
            return rows[0];
        }
        return null;
    },
    checkValidated: async (email, password) =>
    { 
        const rows = await db.load(`select * from user where email = '${email}' and password = '${password}'`);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },

    changeProfile: async entity => 
    {
        await db.load(`update user set name = '${entity.name}', email = '${entity.email}', phone = '${entity.phone}', DOB ='${entity.DOB}' where user_id = '${entity.user_id}'`);
    },
}