var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');

router.get('/all', async function(req, res) {
    if (req.query.type == null)
        var result = await productModel.all();

    else {

        var result = await productModel.getByType(req.query.type);
    }
    var context = {
        items: result
    }
    console.log(result);
    res.render('productAll', context);
});
module.exports = router;