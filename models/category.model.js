const db = require('../utils/database.util');

module.exports = {
    all: _ => db.load('select * from category'),
    add: (cate) => db.load(`INSERT INTO category(category_name) VALUES ('${cate}')`),
    edit: (cate, oldcate) => db.load(`UPDATE category SET category_name = '${cate}' WHERE category_name = '${oldcate}'`),
    clear: _ => db.load('select * from category'),
    addList: _ => db.load('select * from category'),
    remove: (cate) => db.load(`DELETE FROM category WHERE (category_name)='${cate}'`),
};