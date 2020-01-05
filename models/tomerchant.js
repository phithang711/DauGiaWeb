const db = require('../utils/database.util');

module.exports = {
    add: (email) => {
        var query = "INSERT INTO tomerchant values ('" + email +"')";
        try {
            db.load(query);
        } catch {
            console.log("can't add product");
            return false;
        }
        return true;
    },
};