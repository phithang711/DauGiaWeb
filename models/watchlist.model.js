const db = require('../utils/database.util');

module.exports = {
    add: async function(user_id, product_id) {
        var query = `INSERT INTO watchlist values (${user_id},${product_id})`;
        try {
            await db.load(query);
        } catch {
            return false;
        }
        return true;
    },
    remove: async function(user_id, product_id) {
        try {
            await db.load(`DELETE FROM watchlist WHERE (user_id)=${user_id} AND (product_id)=${product_id}`);
        } catch {
            return false;
        }

        return true;

    },
    getByUserId: (user_id) => db.load("SELECT * FROM watchlist WHERE (user_id)=" + user_id)
};