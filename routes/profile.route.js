var express = require('express');
var router = express.Router();


router.get('/:username/assess', function(req, res) {
    res.render('profileAssess', { title: 'Assess' });
});

router.get('/:username/edit', function(req, res) {
    res.render('profileEdit', { title: 'Edit Profile' });
});

router.get('/:username/favourite', function(req, res) {
    res.render('profileFavourite', { title: 'Favourite' });
});


module.exports = router;