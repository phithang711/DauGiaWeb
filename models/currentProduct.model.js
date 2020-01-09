 const db = require('../utils/database.util');

 module.exports = {
     all: _ => db.load('select * from current_product'),
     getById: (id) => db.load("SELECT * FROM current_product WHERE (id)=" + id),
     add: (id) => {
        var query = "INSERT INTO current_product(product_id) VALUES ("+id+")"
        return db.load(query);
     }
 };