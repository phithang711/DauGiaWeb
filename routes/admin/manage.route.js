var express = require('express');
var router = express.Router();

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
    res.render('admin/manage', accountList);
});

module.exports = router;