const categoryModel = require('../models/category.model');
module.exports = function(app) {
    app.use(async function(req, res, next) {
        console.log(req.session.isAuthenticated);
        if (req.session.isAuthenticated === undefined || req.session.isAuthenticated === null) {
            req.session.isAuthenticated = false;
        }

        res.locals.LcCategory = await categoryModel.all();

        res.locals.lcIsAuthenticated = req.session.isAuthenticated;
        res.locals.lcAuthUser = req.session.authUser;

        console.log(req.session.lcIsAuthenticated);
        next();
    })

};