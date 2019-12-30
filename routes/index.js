var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');

router.get('/', async function(req, res) {
    var context = {
        data: [{
                title: "Top Bid",
                items: await productModel.getTopBidCount(),
            },
            {
                title: "Top Price",
                items: await productModel.getTopBidPrice(),
            },
            {
                title: "Ending",
                items: await productModel.getEnding(),
            }
        ],
        slideshow: await productModel.getSlideshow(),
    };
    console.log(context);
    res.render('index', context);
});

module.exports = router;