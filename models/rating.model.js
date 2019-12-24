 const db = require('../utils/database.util');
 const config = require('../configs/ratingModelConfig.json');

 module.exports = {
     all: _ => db.load('select * from rating'),
     //search: (keyword) => db.load("select * from book where match (title) against('-" + keyword + "')"),
     //search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (userId, productId) => db.load("SELECT * FROM rating WHERE (user_id)=" + userId + " AND (product_id)=" + productId)
 };