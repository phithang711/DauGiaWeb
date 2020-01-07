var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model');
const watchlistModel = require('../models/watchlist.model');
const userModel = require('../models/user.model');
const bidModel = require('../models/bid.model');

router.get('/watchlist',async function(req, res, next) {
    
    res.render('bidder/watchList', { title: 'Betview' });
});

router.post('/watchlist', async function(req, res, next) {
    if (req.session.authUser === null || req.session.authUser === undefined) {
        res.status(404) // HTTP status 404: NotFound
            .send('Not found');
        return;
    }
    var productId = req.body.product_id;
    var userId = req.session.authUser.user_id;

    var result = await watchlistModel.add(userId, productId);

    // if(result){
    //     res.redirect(`/item/${productId}`)
    // }
});

router.get('/betview', function(req, res, next) {
    res.render('betview', { title: 'Betview' });
});

router.get('/item/:index', async function(req, res) {
    var index = req.params.index;

    var result = await productModel.getById(index);
    var seller = await userModel.getUserById(result[0].seller_id);
    var currentBidPrice = await bidModel.getCurrentBid(result[0].product_id);
    var productBid = await bidModel.getByProductBidPrice(result[0].product_id, currentBidPrice.price);
    var bidder = await userModel.getUserById(productBid.user_id);

    const minBid = currentBidPrice.price +  result[0].step_price;

    const end_date = (result[0].end_date - result[0].start_date )/1000;
    console.log(end_date);

    let end = "";

    if(end_date > 86400) {
        end = result[0].end_date;
    } else {
        const day = end_date / 86400;
        const hour = (end_date % 86400) / 3600;
        const min = ((end_date % 86400) % 3600) / 60;
        const sec = ((end_date % 86400) % 3600) % 60;
        if(Math.floor(day) > 0) {
            end = day + " days letf.";
        } else if(Math.floor(hour) > 0) {
            end = hour + " hours letf.";
        } else if(Math.floor(min) > 0) {
            end = min + " mins letf.";
        } else if(Math.floor(sec) > 0) {
            end = sec + " secs letf.";
        }
    }

    // if (result.length > 0) {
    //     result[0].description = encrypt.decrypt(result[0].description);
    // }

    const success = req.session.bidSuccessMessage;
    req.session.bidSuccessMessage= null;
    const error =req.session.bidErrorMessage;
    req.session.bidErrorMessage = null;

    res.render('item', {
        err_message: error,
        success_message: success,
        item: result[0],
        seller: seller,
        bidder: bidder,
        end_date: end,
        minBid: minBid,
        current_price: currentBidPrice.price,
        empty: result.length === 0
    })
});

router.post('/item/:index/normalBid',async function (req,res) {
    var index = req.params.index;
    const user = req.session.authUser;
    var result = await productModel.getById(index);
    var currentBidPrice = await bidModel.getCurrentBid(result[0].product_id);
    const minBid = currentBidPrice.price +  result[0].step_price;

    const price = req.body.price;

    if(user.rate < 8) {
        req.session.bidErrorMessage = "Your rating point less than 80%."
    } else {
        if(price < minBid) {
            req.session.bidErrorMessage = "Bid value invalid."    
        } else {
            const currentBidId = await bidModel.getCurrentBidId();
            const entity = {
                bid_id : currentBidId.id + 1,
                product_id: index,
                user_id: user.user_id,
                bid_time: new Date(),
                bid_price: price
            }
            req.session.bidSuccessMessage = "Bid Item Successful.";
            const rt = bidModel.add(entity);
        }
    }
    req.session.save();
    res.redirect('/item/' + index);
});

router.post('/item/:index/autoBid', function(req,res) {

})

router.get('/item/:index/bid', async function(req, res) {
    //get param

    var index = parseInt(req.params.index);
    var result = await productModel.getById(index);
    console.log(result);
    res.render('itemBid', result[0]);
});


router.get('/item/:index/review', function(req, res) {
    //get param
    var productType = req.params.type.normalize();
    var index = parseInt(req.params.index);
    if (productType === 'all') {
        item = products.all.content.items[index];
        res.render('itemReview', item);

    } else {
        item = products.homepageItems.find(item => item.content.title === productType).content.items[index];
        res.render('user_page/commentrate', item);
    }

});

router.get('/otp', (req, res) => {
    res.render('otpMail', { title: "OTP" });
});

router.get('/404', (req, res) => {
    res.render('pageNotFound', { title: "404" });
});
// router.get('/:type/:index/merchantview', function(req, res) {
//     //get param
//     var productType = req.params.type.normalize();
//     var index = parseInt(req.params.index);
//     if (productType === 'all') {
//         item = products.all.content.items[index];
//         res.render('user_page/itemmerchant', item);

//     } else {
//         item = products.homepageItems.find(item => item.content.title === productType).content.items[index];
//         res.render('user_page/itemmerchant', item);
//     }

// });

module.exports = router;