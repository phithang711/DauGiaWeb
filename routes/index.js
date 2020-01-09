var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');
const bidModel = require('../models/bid.model');
const userModel = require('../models/user.model');
var moment = require('moment');

router.get('/', async function(req, res) {
    var limit = 5;
    var offset = 0;

    var context = {
        data: [{
                title: "Top Bid",
                items: await (async function(limit, offset) {
                    var result = await productModel.getTopBidCount(limit, offset);
                    var maxBids = await bidModel.getMaxBidList();


                    var dayCountDown = 0;
                    var checkNewLabel = 0;
                    for (i = 0; i < result.length; i++) {
                        dayCountDown = moment(result[i].end_date).diff(moment(), 'day');
                        if (dayCountDown < 7)
                            result[i].end_date = moment(dayCountDown) + " days";
                        else
                            result[i].end_date = moment(result[i].end_date).format('DD-MM-YYYY HH:mm');

                        checkNewLabel = moment().diff(result[i].start_date, 'minutes');
                        if (checkNewLabel <= 60) {
                            result[i].new = true;
                        } else
                            result[i].new = false;

                        result[i].start_date = moment(result[i].start_date).format('DD-MM-YYYY HH:mm');

                        var curProduct = maxBids.filter(obj => {
                            return obj.product_id === result[i].product_id
                        })[0];

                        if (curProduct == undefined) {
                            result[i].max_price = result[i].first_price;
                            result[i].user_info = "None. Be the first person to bid";
                        } else {
                            var curUser = await userModel.getUserById(curProduct.user_id);

                            result[i].user_info = "*****" + curUser.name.substr(5);

                            if (req.session.authUser != undefined)
                                if (req.session.authUser.user_id === curProduct.user_id) {
                                    result[i].is_holding = true;
                                }

                            result[i].max_price = curProduct.bid_price;
                        }



                    }

                    return result;
                })(limit, offset),
            },
            {
                title: "Top Price",
                items: await (async function(limit, offset) {
                    var result = await productModel.getTopBidPrice(limit, offset);
                    var maxBids = await bidModel.getMaxBidList();


                    var dayCountDown = 0;
                    var checkNewLabel = 0;
                    for (i = 0; i < result.length; i++) {
                        dayCountDown = moment(result[i].end_date).diff(moment(), 'day');
                        if (dayCountDown < 7)
                            result[i].end_date = moment(dayCountDown) + " days";
                        else
                            result[i].end_date = moment(result[i].end_date).format('DD-MM-YYYY HH:mm');

                        checkNewLabel = moment().diff(result[i].start_date, 'minutes');
                        if (checkNewLabel <= 60) {
                            result[i].new = true;
                        } else
                            result[i].new = false;

                        result[i].start_date = moment(result[i].start_date).format('DD-MM-YYYY HH:mm');

                        var curProduct = maxBids.filter(obj => {
                            return obj.product_id === result[i].product_id
                        })[0];

                        if (curProduct == undefined) {
                            result[i].max_price = result[i].first_price;
                            result[i].user_info = "None. Be the first person to bid";
                        } else {
                            var curUser = await userModel.getUserById(curProduct.user_id);

                            result[i].user_info = "*****" + curUser.name.substr(5);

                            if (req.session.authUser != undefined)
                                if (req.session.authUser.user_id === curProduct.user_id) {
                                    result[i].is_holding = true;
                                }

                            result[i].max_price = curProduct.bid_price;
                        }



                    }

                    return result;
                })(limit, offset),
            },
            {
                title: "Ending",
                items: await (async function(limit, offset) {
                    var result = await productModel.getEnding(limit, offset);
                    var maxBids = await bidModel.getMaxBidList();


                    var dayCountDown = 0;
                    var checkNewLabel = 0;
                    for (i = 0; i < result.length; i++) {
                        dayCountDown = moment(result[i].end_date).diff(moment(), 'day');
                        if (dayCountDown < 7)
                            result[i].end_date = moment(dayCountDown) + " days";
                        else
                            result[i].end_date = moment(result[i].end_date).format('DD-MM-YYYY HH:mm');

                        checkNewLabel = moment().diff(result[i].start_date, 'minutes');
                        if (checkNewLabel <= 60) {
                            result[i].new = true;
                        } else
                            result[i].new = false;

                        result[i].start_date = moment(result[i].start_date).format('DD-MM-YYYY HH:mm');

                        var curProduct = maxBids.filter(obj => {
                            return obj.product_id === result[i].product_id
                        })[0];

                        if (curProduct == undefined) {
                            result[i].max_price = result[i].first_price;
                            result[i].user_info = "None. Be the first person to bid";
                        } else {
                            var curUser = await userModel.getUserById(curProduct.user_id);

                            result[i].user_info = "*****" + curUser.name.substr(5);

                            if (req.session.authUser != undefined)
                                if (req.session.authUser.user_id === curProduct.user_id) {
                                    result[i].is_holding = true;
                                }

                            result[i].max_price = curProduct.bid_price;
                        }



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