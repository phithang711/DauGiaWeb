var express = require('express');
var router = express.Router();
const userModel = require('../../models/user.model');
const tomerchantModel = require('../../models/tomerchant');
const categoryModel = require("../../models/category.model");

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

router.get('/manage/category', async function(req, res, next) {
    let categories = await categoryModel.all();
    console.log(categories);
    res.render('admin/manageCategories', { cats: categories });
});

router.post('/manage/category/delete', async function(req, res, next) {
    var cate = req.body.category;

    var accountList = await categoryModel.remove(cate);

    if (accountList) {
        res.send("category deleted");
    } else {
        res.status(400).send("Can't delete");
    }
});

router.post('/manage/category/edit', async function(req, res, next) {
    var cate = req.body.cate;
    var oldcate = req.body.oldcate;

    var accountList = await categoryModel.edit(cate, oldcate);

    if (accountList) {
        res.send("category edited");
    } else {
        res.status(400).send("Can't delete");
    }
    res.send(req.body.cate);
});

router.post('/manage/category/add', async function(req, res, next) {
    var cate = req.body.cate;

    console.log(cate);
    if (cate !== "") {
        var accountList = await categoryModel.add(cate);
    }

    if (accountList) {
        res.send("category added");
    } else {
        res.status(400).send("Can't delete");
    }
});




module.exports = router;