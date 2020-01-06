var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');
const watchlistModel = require('../models/watchlist.model');

router.get('/watchlist',async function(req, res, next) {
    
    res.render('bidder/watchList', { title: 'Betview' });
});

router.post('/watchlist', async function(req, res, next) {
    if (req.session.authUser === null || req.session.authUser === undefined) {
        res.status(404) // HTTP status 404: NotFound
            .send('Not found');
        return;
    }
    var productId = req.body.product_id;
    var userId = req.session.authUser.user_id;

    var result = await watchlistModel.add(userId, productId);

    // if(result){
    //     res.redirect(`/item/${productId}`)
    // }
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