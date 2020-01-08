const categoryModel = require('../models/category.model');
module.exports = function(app) {
    app.use(async function(req, res, next) {
        if (req.session.isAuthenticated === undefined || req.session.isAuthenticated === null) {
            req.session.isAuthenticated = false;
        }
        res.locals.lcIsAuthenticated = req.session.isAuthenticated;
        res.locals.lcAuthUser = req.session.authUser;

        res.locals.LcCategory = await categoryModel.all();
        next();
    })

};