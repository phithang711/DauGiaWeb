const db = require('../utils/database.util');

module.exports = {
    all: _ => db.load("SELECT * FROM tomerchant"),
    add: (email) => {
        var query = "INSERT INTO tomerchant values ('" + email + "')";
        try {
            db.load(query);
        } catch {
            console.log("can't add product");
            return false;
        }
        return true;
    },
    delete: (email) => {
        var query = `DELETE FROM tomerchant WHERE (email)="${email}"`;
        try {
            db.load(query);
        } catch {
            console.log("can't add product");
            return false;
        }
        return true;
    }
};