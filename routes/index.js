var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');
var moment = require('moment');

router.get('/', async function(req, res) {
    var limit = 5;
    var offset = 0;

    var context = {
        data: [{
                title: "Top Bid",
                items: await (async function(limit, offset) {
                    var result = await productModel.getTopBidCount(limit, offset);
                    for (i = 0; i < result.length; i++) {
                        result[i].end_date = moment(result[i].end_date).format('DD-MM-YYYY HH:mm');

                        result[i].start_date = moment(result[i].start_date).format('DD-MM-YYYY HH:mm');
                    }

                    return result;
                })(limit, offset),
            },
            {
                title: "Top Price",
                items: await (async function(limit, offset) {
                    var result = await productModel.getTopBidPrice(limit, offset);
                    for (i = 0; i < result.length; i++) {
                        result[i].end_date = moment(result[i].end_date).format('DD-MM-YYYY HH:mm');

                        result[i].start_date = moment(result[i].start_date).format('DD-MM-YYYY HH:mm');
                    }

                    return result;
                })(limit, offset),
            },
            {
                title: "Ending",
                items: await (async function(limit, offset) {
                    var result = await productModel.getEnding(limit, offset);
                    for (i = 0; i < result.length; i++) {
                        result[i].end_date = moment(result[i].end_date).format('DD-MM-YYYY HH:mm');

                        result[i].start_date = moment(result[i].start_date).format('DD-MM-YYYY HH:mm');
                    }

                    return result;
                })(limit, offset),

            }
        ],
        slideshow: await productModel.getSlideshow(),
    };

    console.log(context);

    res.render('index', context);
});

module.exports = router;