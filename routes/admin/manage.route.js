var express = require('express');
var router = express.Router();
const userModel = require('../../models/user.model');
const tomerchantModel = require('../../models/tomerchant');

router.get('/manage', async function(req, res, next) {
    const accountList = await userModel.all();
    const upgradeRequests = await tomerchantModel.all();

    for (i = 0; i < accountList.length; i++) {
        for (j = 0; j < upgradeRequests.length; j++)
            if (accountList[i].email === upgradeRequests[j].email) {
                accountList[i].haveRequest = true;
            }
    }

    console.log(accountList);
    res.render('admin/manage', { items: accountList });
});

router.post('/manage/delete', async function(req, res, next) {
    var email = req.body.email;

    if (email !== "") {
        var toMerchantResult = await tomerchantModel.delete(email);
        var userDeleteResult = await userModel.remove(email);
    }

    if (userDeleteResult && tomerchantModel) {
        res.send("User deleted");
    } else {
        res.status(400).send("Can't delete");
    }
});

router.post('/manage/downgrade', async function(req, res, next) {
    var email = req.body.email;

    if (email !== "") {
        var userDeleteResult = await userModel.downgrade(email);
    }

    if (userDeleteResult && tomerchantModel) {
        res.send("User downgraded");
    } else {
        res.status(400).send("Operation failed");
    }
});

router.post('/manage/upgrade', async function(req, res, next) {
    var email = req.body.email;

    if (email !== "") {
        var toMerchantResult = await tomerchantModel.delete(email);
        var userDeleteResult = await userModel.upgrade(email);
    }

    if (userDeleteResult && tomerchantModel) {
        res.send("User upgraded");
    } else {
        res.status(400).send("Operation failed");
    }
});

router.post('/manage/downgrade', async function(req, res, next) {


    const accountList = await userModel.all();
    const upgradeRequests = await tomerchantModel.all();


    res.render('admin/manage', { items: accountList });
});

router.get('/manage/category', function(req, res, next) {
    //let accountList = await
    //res.render('admin/manage', accountList);
});


module.exports = router;