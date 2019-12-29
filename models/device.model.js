 const db = require('../utils/database.util');
 const config = require('../configs/deviceModelConfig.json');

 module.exports = {
     all: _ => db.load('select * from device'),
     //search: (keyword) => db.load("select * from book where match (title) against('-" + keyword + "')"),
     search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (id) => db.load("SELECT * FROM device WHERE (device_id)=" + id),
     add: (info) => {
         var query = "INSERT INTO device (";

         for (var key in info) {
             if (info.hasOwnProperty(key)) {
                 query = query + "`" + key + "`,";
             }
         }

         query = query.substring(0, query.length - 1) + ") VALUES (";

         for (var key in info) {
             if (info.hasOwnProperty(key)) {

                 query = query + "'" + info[key] + "',";
             }
         }

         query = query.substring(0, query.length - 1) + ");";

         try {
             db.load(query);
         } catch {
             console.log("can't add device");
             return false;
         }
         return true;
     },
     getLastId: () => db.load('SELECT device_id FROM device ORDER BY device_id DESC LIMIT 1'),
 };