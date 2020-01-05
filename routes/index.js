var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');

router.get('/', async function(req, res) {
    var limit = 5;
    var offset = 0;

    var context = {
        data: [{
                title: "Top Bid",
                items: await productModel.getTopBidCount(limit, offset),
            },
            {
                title: "Top Price",
                items: await productModel.getTopBidPrice(limit, offset),
            },
            {
                title: "Ending",
                items: await productModel.getEnding(limit, offset),
            }
        ],
        slideshow: await productModel.getSlideshow(),
    };
    console.log(context);
    res.render('index', context);
});

module.exports = router;