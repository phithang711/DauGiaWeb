 const db = require('../utils/database.util');
 const config = require('../configs/deviceModelConfig.json');

 module.exports = {
     all: _ => db.load('select * from device'),
     //search: (keyword) => db.load("select * from book where match (title) against('-" + keyword + "')"),
     search: (keyword) => db.load("SELECT * FROM device WHERE (brand) LIKE '%" + keyword + "%' OR (model) LIKE '%" + keyword + "%'"),
     getById: (id) => db.load("SELECT * FROM device WHERE (id)=" + id)
 };