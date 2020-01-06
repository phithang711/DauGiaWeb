const db = require('../utils/database.util');

module.exports = {
    add: function(user_id, product_id) {
        var query = `INSERT INTO watchlist values (${user_id},${product_id})`;
        try {
            db.load(query);
        } catch {
            console.log("can't add product");
            return false;
        }
        return true;
    },
    getByUserId: (user_id) => db.load("SELECT * FROM watchlist WHERE (user_id)=" + user_id)
};