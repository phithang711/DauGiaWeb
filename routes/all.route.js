var express = require('express');
var router = express.Router();
const deviceModel = require('../models/device.model');

router.get('/all', async function(req, res) {
    var result = await deviceModel.all();
    var context = {
        items: result
    }
    res.render('productAll', context);
});
module.exports = router;