 const db = require('../utils/database.util');
 const config = require('../configs/commentModelConfig.json');

 module.exports = {
     all: _ => db.load('select * from comment'),
     //search: (keyword) => db.load("select * from book where match (title) against('-" + keyword + "')"),
     //search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (userId) => db.load(`select * from comment where user_id = '${userId}' and type = 1`),
 
    add: entity => db.add(entity, 'comment'),
    
    getByUserId: (user_id) => db.load(`select * from comment where user_id = '${user_id}'`),

};