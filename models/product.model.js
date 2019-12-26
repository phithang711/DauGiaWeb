 const db = require('../utils/database.util');
 const config = require('../configs/productModelConfig.json');

 module.exports = {
     all: _ => db.load('SELECT * FROM product AS b INNER JOIN product as a ON (b.id=a.device_id)'),
     //search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (id) => db.load("SELECT * FROM product WHERE (id)=" + id),
     //getByType: (type) => db.load("SELECT * FROM device AS b INNER JOIN product as a ON (b.id=a.device_id) AND " ),
     add: (info) => {
         //Add product
     },
 };