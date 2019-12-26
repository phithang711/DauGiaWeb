 const db = require('../utils/database.util');
 const config = require('../configs/productModelConfig.json');

 module.exports = {
     all: _ => db.load('SELECT * FROM product AS b INNER JOIN product as a ON (b.id=a.device_id)'),
     //search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (id) => db.load("SELECT * FROM product WHERE (id)=" + id),
     //getByType: (type) => db.load("SELECT * FROM device AS b INNER JOIN product as a ON (b.id=a.device_id) AND " ),
     add: (info) => {
         //INSERT INTO `bh1qqiz4n9xynvm2tzc8`.`product` (`device_id`, `seller_id`, `first_price`, `step_price`, `start_date`, `end_date`) VALUES ('', '', '', '', '', '');
         var query = "INSERT INTO product (";

         for (var key in info) {
             if (info.hasOwnProperty(key)) {
                 query = query + "`" + key + "`,";
             }
         }

         query = query.substring(0, query.length - 1) + ") VALUES (";

         for (var key in info) {
             if (info.hasOwnProperty(key)) {
                 if (key === "device-id")
                     query = query + info[key] + ",";
                 else
                     query = query + "'" + info[key] + "',";
             }
         }

         query = query.substring(0, query.length - 1) + ");";

         try {
             db.load(query);
         } catch {
             return false;
         }
         return true;
     },
 };