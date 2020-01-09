    var express = require('express');
    var router = express.Router();
    const productModel = require('../models/product.model');
    var moment = require('moment');

    router.get('/all', async function(req, res) {
        var limit = 10;
        var type = req.query.type;
        var getPage = req.query.page;
        var getOrder = req.query.order;
        var getOption = req.query.option;
        var getKeyword = req.query.keyword;
        if (getPage === undefined)
            getPage = 1;

        var result = [];
        var count = 0;
        if (getKeyword === undefined || getKeyword === null) {
            if (type == null) {
                result = await productModel.all(limit, (getPage - 1) * limit);
                count = (await productModel.all(1000000, 0)).length;

            } else {
                if (getOption === "ending") {
                    result = await productModel.getEnding(limit, (getPage - 1) * limit);
                    count = (await productModel.getEnding(1000000, 0)).length;
                } else if (getOption === "price") {
                    result = await productModel.getTopBidPrice(limit, (getPage - 1) * limit);
                    count = (await productModel.getTopBidPrice(1000000, 0)).length;
                } else if (getOption === "bid") {
                    result = await productModel.getTopBidCount(limit, (getPage - 1) * limit);
                    count = (await productModel.getTopBidCount(1000000, 0)).length;
                }

                if (getOrder === "descending") {
                    result = result.reverse();
                }
                if (type !== undefined && type !== "all") {
                    result = result.filter((row) => row.type === type);
                }
            }
        } else {
            result = await productModel.search(limit, (getPage - 1) * limit, getKeyword);
            count = (await productModel.search(1000000, 0, getKeyword)).length;
        }

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
        }

        count = Math.round(count / limit) + 1;

        var context = {
            items: result,
            page: getPage,
            totalPage: count,
            empty: result.length === 0
        }
        res.render('productAll', context);
    });

    module.exports = router;