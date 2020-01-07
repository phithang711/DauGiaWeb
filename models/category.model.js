const db = require('../utils/database.util');

module.exports = {
    all: _ => db.load('select * from category'),
    add: _ => db.load('select * from category'),
    clear: _ => db.load('select * from category'),
    addList: _ => db.load('select * from category'),
};