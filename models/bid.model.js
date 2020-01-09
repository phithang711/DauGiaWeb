 const db = require('../utils/database.util');
 const config = require('../configs/bidModelConfig.json');

 module.exports = {
     all: _ => db.load('select * from bid'),
     //search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (id) => db.load("SELECT * FROM bid WHERE (bid_id)=" + id),

     getByProductBidPrice: async(product_id, price) => {
         const rows = await db.load(`select * from bid where bid_price = '${price}' and product_id = '${product_id}'`);
         if (rows.length > 0) {
             return rows[0];
         }
         return null;
     },

     getMaxBidList: () => db.load('select s.* from bid s where s.bid_price = (select max(s2.bid_price) from bid s2 where s2.product_id = s.product_id)'),

     getCurrentBid: async product_id => {
         const rows = await db.load(`select Max(bid_price) as price from (select * from bid where product_id = '${product_id}') as temp`);
         if (rows.length > 0) {
             return rows[0];
         }
         return null;
     },

     add: entity => db.add(entity, 'bid'),

     getCurrentBidId: async() => {
         const rows = await db.load(`select max(bid_id) as id from bid`);
         if (rows.length > 0) {
             return rows[0];
         }
         return null;
     },

     getAllBidAuto: async(product_id) => {
         const rows = await db.load(`select * from bid where product_id = '${product_id}' and isAutoBid = 1 and maxAutoBid > bid_price`)
         if (rows.length > 0) {
             return rows;
         }
         return null;
     },

     changeBidPrice: (bid_id, price, date) => db.load(`update bid set bid_price = '${price}', bid_time = '${date}'  where bid_id = '${bid_id}'`),

     deleteBid: (product_id, user_id) => db.load(`delete from bid where user_id = '${user_id}' and product_id = '${product_id}'`),

     getBidderWithId: async(product_id, user_id) => {
         const rows = await db.load(`select * from bid where product_id = '${product_id}' and user_id  = '${user_id}'`);
         if (rows.length > 0) {
             return rows[0];
         }
         return null;
     },

     getMaxBidAuto: async(product_id) => {
         const rows = await db.load(`select max(maxAutoBid) as value from bid where product_id = '${product_id}' and isAutoBid = 1 and maxAutoBid > bid_price`)
         if (rows.length > 0) {
             return rows[0];
         }
         return null;
     },

     getMaxBidAutoExcept: async(product_id, value) => {
         const rows = await db.load(`select max(maxAutoBid) as value from bid where product_id = '${product_id}' and maxAutoBid != '${value}' and isAutoBid = 1 and maxAutoBid > bid_price`)
         if (rows.length > 0) {
             return rows[0];
         }
         return null;
     },

     getMaxBidderAuto: async(product_id, value) => {
         const rows = await db.load(`select * from bid where product_id = '${product_id}' and maxAutoBid = '${value}' and isAutoBid = 1 `)
         if (rows.length > 0) {
             return rows[0];
         }
         return null;
     },

     getTopBidder: async(product_id) => {
         const rows = await db.load(`select * from (SELECT * from bid where product_id = '${product_id}') as newTable order by bid_price desc limit 5 `)
         if (rows.length > 0) {
             return rows;
         }
         return null;
     },

     getBidWithProductId: async(product_id) => {
         const rows = await db.load(`select * from bid where product_id = '${product_id}'`);
         if (rows.length > 0) {
             return rows;
         }
         return null;
     }
 };