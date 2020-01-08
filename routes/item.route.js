var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');
const watchlistModel = require('../models/watchlist.model');

router.get('/watchlist', async function(req, res, next) {
    if (req.session.authUser === null || req.session.authUser === undefined) {
        res.status(404) // HTTP status 404: NotFound
            .render('pageNotFound');
        return;
    }

    result = await watchlistModel.getByUserId(req.session.authUser.user_id);

    var products = [];

    result.forEach(async(element) => {
        product = await productModel.getById(element.product_id);
        products.push(product[0]);
    });

    res.render('bidder/watchList', { title: 'Watchlist', items: products, user_id: req.session.authUser.user_id });
});

router.post('/watchlist', function(req, res, next) {
    if (req.session.authUser === null || req.session.authUser === undefined) {
        res.status(404) // HTTP status 404: NotFound
            .send('Not found');
        return;
    }
    var productId = req.body.product_id;
    var userId = req.session.authUser.user_id;

    var result = watchlistModel.add(userId, productId);

    // if(result){
    //     res.redirect(`/item/${productId}`)
    // }
    res.redirect('/watchlist');
});

router.post('/watchlist/remove', function(req, res, next) {
    if (req.session.authUser === null || req.session.authUser === undefined) {
        res.status(404) // HTTP status 404: NotFound
            .send('Not found');
        return;
    }
    var productId = req.body.product_id;
    var userId = req.session.authUser.user_id;

    var result = watchlistModel.remove(userId, productId);

    res.redirect('/');
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
    var sd = Date(result[0].start_date);
    var ed = Date(result[0].end_date);
    result[0].start_date = sd.substring(0, sd.indexOf('G') - 1);
    result[0].end_date = ed.substring(0, ed.indexOf('G') - 1);



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
    res.render('otpMail', { title: "OTP" });
});

router.get('/404', (req, res) => {
    res.render('pageNotFound', { title: "404" });
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