 const db = require('../utils/database.util');
 const config = require('../configs/productModelConfig.json');

 module.exports = {
     all: _ => db.load('SELECT * FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id)'),
     //search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (id) => db.load("SELECT * FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id) WHERE (product_id)=" + id),
     getTopBidCount: () => db.load('SELECT * FROM device AS b INNER JOIN (SELECT p.*, COUNT(b.product_id) AS count FROM product AS p LEFT JOIN bid AS b ON p.product_id = b.product_id GROUP BY p.product_id ORDER BY count DESC) as a ON (b.device_id=a.device_id) LIMIT 5'),
     getTopBidPrice: () => db.load('SELECT * FROM device AS b INNER JOIN (SELECT p.*, b.price AS price FROM product AS p LEFT JOIN bid AS b ON p.product_id = b.product_id ORDER BY price DESC) as a ON (b.device_id=a.device_id) LIMIT 5'),
     getEnding: () => db.load('SELECT * FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id) WHERE CURDATE()<= a.end_date ORDER BY a.end_date LIMIT 5'),
     getSlideshow: () => db.load("SELECT * FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id) WHERE NOT (img_url2 IS NULL OR img_url2 = '') ORDER BY RAND() LIMIT 3;"),
     getByType: (type) => db.load(`SELECT * FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id) WHERE (b.type)='${type}'`),
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
             console.log("can't add product");
             return false;
         }
         return true;
     },
 };