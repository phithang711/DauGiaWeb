var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');

router.get('/all', async function(req, res) {
    var type = req.query.type;
    var limit = 10;
    var getPage = req.query.page;
    var getOrder = req.query.order;
    var getType = req.query.option;
    if (getPage === undefined)
        getPage = 1;

    if (type == null) {
        var result = await productModel.all(limit, (getPage - 1) * limit);
        var count = (await productModel.all(1000000, 0)).length;

    } else {
        var result = await productModel.getByType(type, limit, (getPage - 1) * limit);

        var count = (await productModel.getByType(type, 1000000, 0)).length;
    }

    count = Math.round(count / limit) + 1;

    var context = {
        items: result,
        page: getPage,
        totalPage: count + 1,
        empty: result.length === 0
    }
    res.render('productAll', context);
});

module.exports = router;