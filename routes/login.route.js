var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'AuctionDealer Login', layout: false });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'AuctionDealer Sign up', layout: false });
});

module.exports = router;