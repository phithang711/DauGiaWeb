var express = require('express');
var router = express.Router();

var products = require('./products');

router.get('/', function(req, res) {
    var context = {
        data: products.homepageItems,
        slideshow: products.homepageItems
    };
    res.render('index', context);
});

router.get('/all', function(req, res) {
    var context = products.all;
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

router.get('/:type/:index', function(req, res) {
    //get param
    var productType = req.params.type.normalize();
    var index = parseInt(req.params.index);
    if (productType === 'all') {
        item = products.all.content.items[index];
        res.render('user_page/item', item);

    } else {
        item=products.homepageItems.find(item => item.content.title === productType).content.items[index];
        // item = products.homepageItems.filter(obj => {
        //     return obj.content.title === productType
        //   }).content.items[index];
          res.render('user_page/item', item);
    }
    
});

router.get('/:type/:index/bid', function(req, res) {
    //get param
    var productType = req.params.type.normalize();
    var index = parseInt(req.params.index);
    if (productType === 'all') {
        item = products.all.content.items[index];
        res.render('user_page/itemBid', item);

    } else {
        item=products.homepageItems.find(item => item.content.title === productType).content.items[index];
        res.render('user_page/itemBid', item);
    }
    
});

router.get('/:type/:index/review', function(req, res) {
    //get param
    var productType = req.params.type.normalize();
    var index = parseInt(req.params.index);
    if (productType === 'all') {
        item = products.all.content.items[index];
        res.render('user_page/commentrate', item);

    } else {
        item=products.homepageItems.find(item => item.content.title === productType).content.items[index];
        res.render('user_page/commentrate', item);
    }
    
});


module.exports = router;