 const db = require('../utils/database.util');
 const config = require('../configs/productModelConfig.json');

 module.exports = {
     all: (limit, offset) => db.load(`SELECT * FROM device AS b INNER JOIN (SELECT p.*,b.user_id,b.bid_price, COUNT(b.product_id) AS count FROM product AS p LEFT JOIN bid AS b ON p.product_id = b.product_id WHERE CURDATE()<= p.end_date GROUP BY p.product_id) as a ON (b.device_id=a.device_id) LIMIT ${limit} OFFSET ${offset}`),
     search: (limit, offset, keyword) => db.load(`SELECT * FROM device AS b INNER JOIN (SELECT p.*,b.user_id,b.bid_price, COUNT(b.product_id) AS count FROM product AS p LEFT JOIN bid AS b ON p.product_id = b.product_id WHERE CURDATE()<= p.end_date GROUP BY p.product_id) as a ON (b.device_id=a.device_id AND MATCH(b.model,b.brand,b.type) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)) LIMIT ${limit} OFFSET ${offset}`),
     getCount: _ => db.load('SELECT COUNT(*) FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id) WHERE CURDATE()<= a.end_date'),
     getmaxId: _ => {
        var query="Select max(product_id) as id from product";
        return db.load(query);
     },
     getById: (id) => db.load(`SELECT * FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id) WHERE CURDATE()<= a.end_date AND (a.product_id)= ${id}`),
     getTopBidCount: (limit, offset) => db.load(`SELECT * FROM device AS b INNER JOIN (SELECT p.*, COUNT(b.product_id) AS count FROM product AS p LEFT JOIN bid AS b ON p.product_id = b.product_id WHERE CURDATE()<= p.end_date GROUP BY p.product_id ORDER BY count DESC) as a ON (b.device_id=a.device_id) LIMIT ${limit} OFFSET ${offset}`),
     getTopBidPrice: (limit, offset) => db.load(`SELECT * FROM device AS b INNER JOIN (SELECT p.*,b.user_id,b.bid_price, COUNT(b.product_id) AS count FROM product AS p LEFT JOIN bid AS b ON p.product_id = b.product_id WHERE CURDATE()<= p.end_date GROUP BY p.product_id) as a ON (b.device_id=a.device_id) ORDER BY a.bid_price DESC LIMIT ${limit} OFFSET ${offset}`),
     getEnding: (limit, offset) => db.load(`SELECT * FROM device AS b INNER JOIN (SELECT p.*, COUNT(b.product_id) AS count FROM product AS p LEFT JOIN bid AS b ON p.product_id = b.product_id WHERE CURDATE()<= p.end_date GROUP BY p.product_id ORDER BY p.end_date) as a ON (b.device_id=a.device_id) LIMIT ${limit} OFFSET ${offset}`),
     getSlideshow: () => db.load("SELECT * FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id) WHERE CURDATE()<= a.end_date AND NOT (img_url2 IS NULL OR img_url2 = '') ORDER BY RAND() LIMIT 3;"),
     getByType: (type, limit, offset) => db.load(`SELECT * FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id) WHERE CURDATE()<= a.end_date AND (b.type)='${type}' LIMIT ${limit} OFFSET ${offset}`),
     add: (info) => {
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

         console.log(query);

         try {
             db.load(query);
         } catch {
             console.log("can't add product");
             return false;
         }
         return true;
     },
     
    checkIsBan: async (product_id, user_id) => { 
        const rows = await db.load(`select * from ban where product_id=  '${product_id}' and user_id = '${user_id}'`);
        if(rows.length > 0) {
            return true;
        }
        return false;
    },

    addBanAccount: async entity => {
      await db.load(`insert into ban values('${entity.ban_id}','${entity.user_id}','${entity.product_id}')`) ;
    },

    getAllBan: async (product_id) => {
        const rows = await db.load(`select * from ban where product_id = '${product_id}'`);
        if(rows.length > 0)
        {
            return rows;
        }
        return null;
    },

    getMaxBanId: async ()=> {
        const rows = await db.load(`select max(ban_id) as id from ban`);
        if(rows.length > 0) {
            return rows[0].id;
        }
        return 0;
    },

    getProductByIdNotCheckTime: async product_id => {
        const rows = await db.load(`SELECT * FROM device AS b INNER JOIN product as a ON (b.device_id=a.device_id) WHERE (a.product_id)= ${product_id}`);
        if(rows.length > 0) {
            return rows;
        }

        return null;
    }
 };