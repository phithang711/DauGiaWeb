 const db = require('../utils/database.util');
 const config = require('../configs/bidModelConfig.json');

 module.exports = {
     all: _ => db.load('select * from bid'),
     //search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (id) => db.load("SELECT * FROM bid WHERE (id)=" + id)
 };