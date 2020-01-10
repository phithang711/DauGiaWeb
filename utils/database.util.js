const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    // connectionLimit: 100,
    // host: 'bh1qqiz4n9xynvm2tzc8-mysql.services.clever-cloud.com',
    // port: 3306,
    // user: 'utgf1so6lfjyclgm',
    // password: '2XuYsIrCQWUOsQ4zt43B',
    // database: 'bh1qqiz4n9xynvm2tzc8',
    // insecureAuth: true
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ductrung@@113',
    database: 'web03',
    insecureAuth: true
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql => pool_query(sql),
    add: (entity, table) => pool_query(`insert into ${table} set ?`, entity),
    del: (condition, table) => pool_query(`delete from ${table} where ?`, condition),
    patch: (entity, condition, table) => pool_query(`update ${table} set ? where ?`, [entity, condition]),
};