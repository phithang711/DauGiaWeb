var express = require('express');
var router = express.Router();


router.get('/:username/assess', function(req, res) {
    res.render('profileAssess', { title: 'Assess' });
});

router.get('/:username/edit', function(req, res) {

    var type = {
        bidder: true,
        seller: false,
        admin: false
    };
    
    res.render('profileEdit', { title: 'Edit Profile', item: type });
});

router.get('/:username/favourite', function(req, res) {
    res.render('profileFavourite', { title: 'Favourite' });
});

router.get('/:username/example', function(req, res) {
    res.render('example', { title: 'aloalo' });
});


module.exports = router;