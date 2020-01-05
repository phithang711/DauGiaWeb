var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');
var encrypt = require('../utils/encrypt.util');

router.get('/watchlist', function(req, res, next) {
    console.log("SESS" + req.session.authUser.id);
    res.render('bidder/watchList', { title: 'Betview' });
});

router.get('/betview', function(req, res, next) {
    res.render('betview', { title: 'Betview' });
});

router.get('/item/:index', async function(req, res) {
    var index = req.params.index;

    var result = await productModel.getById(index);
    console.log(result);
    // if (result.length > 0) {
    //     result[0].description = encrypt.decrypt(result[0].description);
    // }
    res.render('item', {
        item: result[0],
        empty: result.length === 0
    })
});

router.get('/item/:index/bid', async function(req, res) {
    //get param

    var index = parseInt(req.params.index);
    var result = await productModel.getById(index);
    console.log(result);
    res.render('itemBid', result[0]);
});


router.get('/item/:index/review', function(req, res) {
    //get param
    var productType = req.params.type.normalize();
    var index = parseInt(req.params.index);
    if (productType === 'all') {
        item = products.all.content.items[index];
        res.render('itemReview', item);

    } else {
        item = products.homepageItems.find(item => item.content.title === productType).content.items[index];
        res.render('user_page/commentrate', item);
    }

});

router.get('/otp', (req, res) => {	 
    res.render('otpMail', {title: "OTP"});
});

router.get('/404', (req, res) => {	 
    res.render('pageNotFound', {title: "404"});
});
// router.get('/:type/:index/merchantview', function(req, res) {
//     //get param
//     var productType = req.params.type.normalize();
//     var index = parseInt(req.params.index);
//     if (productType === 'all') {
//         item = products.all.content.items[index];
//         res.render('user_page/itemmerchant', item);

//     } else {
//         item = products.homepageItems.find(item => item.content.title === productType).content.items[index];
//         res.render('user_page/itemmerchant', item);
//     }

// });

module.exports = router;