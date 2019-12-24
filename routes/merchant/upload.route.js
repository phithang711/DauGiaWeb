var express = require('express');
var router = express.Router();
const deviceModel = require('../../models/device.model');

router.get('/upload', function(req, res) {
    res.render('merchant/uploadProduct', { title: 'Upload a product:' });

});

module.exports = router;