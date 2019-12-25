var express = require('express');
var router = express.Router();
const deviceModel = require('../models/device.model');

router.get('/', function(req, res) {
    // var context = {
    //     data: products.homepageItems,
    //     slideshow: products.slideShowItems
    // };
    res.render('index');
});



module.exports = router;