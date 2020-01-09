 const db = require('../utils/database.util');
 const productModel = require('./product.model');

 module.exports = {
     all: _ => db.load('select * from current_product'),
     getById: (id) => db.load("SELECT * FROM current_product WHERE (id)=" + id),
     add: async id => {

        console.log(id);
         
        var test_id = await productModel.getmaxId();
        
        var query = "INSERT INTO current_product(product_id) VALUES ("+(test_id[0].id+1)+")";
        console.log(query);
        db.load(query);
     } 
 };