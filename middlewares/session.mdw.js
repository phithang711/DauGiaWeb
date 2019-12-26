const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

module.exports = function(app) {
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: new MySQLStore({
            connectionLimit: 100,
            host: 'bh1qqiz4n9xynvm2tzc8-mysql.services.clever-cloud.com',
            port: 3306,
            user: 'utgf1so6lfjyclgm',
            password: '2XuYsIrCQWUOsQ4zt43B',
            database: 'bh1qqiz4n9xynvm2tzc8',
            charset: 'utf8mb4_bin',
            schema: {
                tableName: 'sessions',
                columnNames: {
                    session_id: 'session_id',
                    expires: 'expires',
                    data: 'data'
                }
            }
        }),
    }))
    app.use(async function(req, res, next) {
        if (req.session.isAuthenticated === undefined || req.session.isAuthenticated === null) {
            req.session.isAuthenticated = false;
        }

        res.locals.lcIsAuthenticated = req.session.isAuthenticated;
        res.locals.lcAuthUser = req.session.authUser;

        next();
    })
};