var express = require('express');
var router = express.Router();
const deviceModel = require('../models/device.model');

var products = require('./products');

router.get('/', function(req, res) {
    var context = {
        data: products.homepageItems,
        slideshow: products.slideShowItems
    };
    res.render('index', context);
});

router.get('/all', async function(req, res) {
    var result = await deviceModel.all();

    var context = {
        title: "all",
        items: result
    }
    res.render('allProducts', context);
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'AuctionDealer Login' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'AuctionDealer Sign up' });
});

router.get('/betview', function(req, res, next) {
    res.render('betview', { title: 'Betview' });
});

router.get('/uiitem', function(req, res, next) {
    res.render('user_page/item', { title: 'Express' });
});

router.get('/item/:index', async function(req, res) {
    var index = req.params.index;

    var result = await deviceModel.getById(index);

    res.render('user_page/item', {
        item: result[0],
        empty: result.length === 0
    })
});

router.get('/:type/:index/bid', function(req, res) {
    //get param
    var productType = req.params.type.normalize();
    var index = parseInt(req.params.index);
    if (productType === 'all') {
        item = products.all.content.items[index];
        res.render('user_page/itemBid', item);

    } else {
        item = products.homepageItems.find(item => item.content.title === productType).content.items[index];
        res.render('user_page/itemBid', item);
    }

});


router.get('/upload', function(req, res) {
    res.render('user_page/uploadProduct', { title: 'Upload a product:' });

});

router.get('/otp', function(req, res) {
    res.render('otpMail', { title: '' });

});

router.get('/pageNotFound', function(req, res) {
    res.render('pageNotFound', { title: '' });

});
router.get('/:type/:index/review', function(req, res) {
    //get param
    var productType = req.params.type.normalize();
    var index = parseInt(req.params.index);
    if (productType === 'all') {
        item = products.all.content.items[index];
        res.render('user_page/commentrate', item);

    } else {
        item = products.homepageItems.find(item => item.content.title === productType).content.items[index];
        res.render('user_page/commentrate', item);
    }

});

router.get('/:type/:index/merchantview', function(req, res) {
    //get param
    var productType = req.params.type.normalize();
    var index = parseInt(req.params.index);
    if (productType === 'all') {
        item = products.all.content.items[index];
        res.render('user_page/itemmerchant', item);

    } else {
        item = products.homepageItems.find(item => item.content.title === productType).content.items[index];
        res.render('user_page/itemmerchant', item);
    }

});



router.get('/user/:username/assess', function(req, res) {
    res.render('user_page/assess', { title: 'Assess' });
});

router.get('/user/:username/edit', function(req, res) {
    res.render('user_page/editProfile', { title: 'Edit Profile' });
});

router.get('/user/:username/favourite', function(req, res) {
    res.render('user_page/favourite', { title: 'Favourite' });
});

router.get('/watchlist', function(req, res, next) {
    res.render('watchListView', { title: 'List' });
});

router.get('/manage', function(req, res, next) {
    let accountList = [{
            id: "1",
            name: "abc"
        },
        {
            id: "2",
            name: "bcd"
        }
    ]
    res.render('manageView', accountList);
});


module.exports = router;