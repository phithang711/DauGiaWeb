 const db = require('../utils/database.util');
 const config = require('../configs/bidModelConfig.json');

 module.exports = {
     all: _ => db.load('select * from bid'),
     //search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (id) => db.load("SELECT * FROM bid WHERE (bid_id)=" + id),

     getByProductBidPrice: async (product_id, price) => {
         const rows = await db.load(`select * from bid where bid_price = '${price}' and product_id = '${product_id}'`);
         if(rows.length > 0) {
             return rows[0];
         }
         return null;
     },

     getCurrentBid: async product_id => {
         const rows = await db.load(`select Max(bid_price) as price from (select * from bid where product_id = '${product_id}') as temp`);
         if(rows.length > 0)
         {
             return rows[0];
         }
         return null;
     },

     add: entity => db.add(entity, 'bid'),

     getCurrentBidId: async () => {
         const rows = await db.load(`select max(bid_id) as id from bid`);
         if(rows.length > 0) {
             return rows[0];
         }
         return null;
     },
     
     getAllBidAuto: async () => {
         const rows = await db.load(`select * from bid where isAutoBid = 1 and maxAutoBid > bid_price`)
         if(rows.length > 0)
         {
             return rows;
         }
         return null;
     },

     changeBidPrice: (bid_id, price)  => db.load(`update bid set bid_price = '${price}' where bid_id = '${bid_id}'`),

 };