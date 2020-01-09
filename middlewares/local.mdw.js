const categoryModel = require('../models/category.model');
const bidModel = require('../models/bid.model');
module.exports = function(app) {
    app.use(async function(req, res, next) {
        if (req.session.isAuthenticated === undefined || req.session.isAuthenticated === null) {
            req.session.isAuthenticated = false;
        }
        res.locals.lcIsAuthenticated = req.session.isAuthenticated;
        res.locals.lcAuthUser = req.session.authUser;

        res.locals.LcCategory = await categoryModel.all();
        res.locals.maxBids = await bidModel.getMaxBidList();
        next();
    })

};