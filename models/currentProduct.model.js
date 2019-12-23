 const db = require('../utils/database.util');
 const config = require('../configs/currentProductModelConfig.json');

 module.exports = {
     all: _ => db.load('select * from current_product'),
     getById: (id) => db.load("SELECT * FROM current_product WHERE (id)=" + id)
 };