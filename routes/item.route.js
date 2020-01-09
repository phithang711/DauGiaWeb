var express = require("express");
var router = express.Router();
const productModel = require("../models/product.model");
const watchlistModel = require("../models/watchlist.model");
const userModel = require("../models/user.model");
const bidModel = require("../models/bid.model");
const moment = require('moment');
const nodemailer = require('nodemailer');
const getMailContent = require("./mail.content.js");

router.get("/otp", (req, res) => {
    res.render("otpMail", { title: "OTP" });
});

async function sendMailNormalBid(user, price, productName, merchantName, title, type) {
    console.log(1234);


    const output = getMailContent.getBidMailContent(user, price, productName, merchantName);
    if (type === 1) {
        const output = getMailContent.getWinMailContent(user, price, productName, merchantName);
    } else if (type === 2) {
        const output = getMailContent.getBannedMailContent(user, price, productName, merchantName);
    }


    // create reusable transporter object using the default SMTP transport
    let transporter = await nodemailer.createTransport({
        service: 'gmail',
        // host: 'mail.YOURDOMAIN.com',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: 'derekzohar@gmail.com', // generated ethereal user
            pass: 'thangww123' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = await {
        from: '"Online Auction" <derekzohar@gmail.com>', // sender address
        //to: 'ngovietthangww@gmail.com', // list of receivers
        to: user.email,
        subject: title, // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        //res.render('otpMail', { title: 'otp' });	
    });
}
router.post("/item/:index/normalBid", async function(req, res) {
    var index = req.params.index;
    const user = req.session.authUser;
    var result = await productModel.getById(index);
    var currentBidPrice = await bidModel.getCurrentBid(result[0].product_id);
    let minBid = currentBidPrice.price + result[0].step_price;
    if (currentBidPrice.price === null) {
        minBid = result[0].first_price;
    }

    const price = req.body.price;

    if (user === null) {
        res.cookie("bidErrorMessage", "You must login to bid.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else if (user.rate < 4) {
        res.cookie("bidErrorMessage", "Your rating point less than 80%.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else {
        if (price < minBid) {
            res.cookie("bidErrorMessage", "Bid value invalid.", {
                maxAge: 900000,
                httpOnly: true
            });
        } else {
            await bidModel.deleteBid(result[0].product_id, user.user_id);
            const currentBidId = await bidModel.getCurrentBidId();
            const entity = {
                bid_id: currentBidId.id + 1,
                product_id: index,
                user_id: user.user_id,
                bid_time: new Date(),
                bid_price: price
            };
            res.cookie("bidSuccessMessage", "Bid Item Successful.", {
                maxAge: 900000,
                httpOnly: true
            });
            const rt = bidModel.add(entity);

            /////////////////////////////////////////////////////////////// ADD EMAIL 
            var seller = await userModel.getUserById(result[0].seller_id)
            sendMailNormalBid(user, price, result[0].brand + result[0].model, seller.name, "You bidded this product", 0);
            sendMailNormalBid(seller, price, result[0].brand + result[0].model, "*****" + user.name.substr(5), "A bidder bidded your product", 1);

            checkAutoBid(index, result[0].step_price);
        }
    }
    res.redirect("/item/" + index);
});

router.get("/404", (req, res) => {
    res.render("pageNotFound", { title: "404" });
});

router.get('/watchlist', async function(req, res, next) {
    if (req.session.authUser === null || req.session.authUser === undefined) {
        res.status(404) // HTTP status 404: NotFound
            .render('pageNotFound');
        return;
    }

    result = await watchlistModel.getByUserId(req.session.authUser.user_id);

    var products = [];

    result.forEach(async(element) => {
        product = await productModel.getById(element.product_id);
        products.push(product[0]);
    });

    res.render('bidder/watchList', { title: 'Watchlist', items: products, user_id: req.session.authUser.user_id });
});

router.post('/watchlist', function(req, res, next) {
    if (req.session.authUser === null || req.session.authUser === undefined) {
        res.status(404) // HTTP status 404: NotFound
            .send('Not found');
        return;
    }
    var productId = req.body.product_id;
    var userId = req.session.authUser.user_id;

    var result = watchlistModel.add(userId, productId);

    // if(result){
    //     res.redirect(`/item/${productId}`)
    // }
    res.redirect('/watchlist');
});

router.post('/watchlist/remove', function(req, res, next) {
    if (req.session.authUser === null || req.session.authUser === undefined) {
        res.status(404) // HTTP status 404: NotFound
            .send('Not found');
        return;
    }
    var productId = req.body.product_id;
    var userId = req.session.authUser.user_id;

    var result = watchlistModel.remove(userId, productId);

    res.redirect('/');
});

router.get("/betview", function(req, res, next) {
    res.render("betview", { title: "Betview" });
});

router.get("/item/:index", async function(req, res) {
    var index = req.params.index;

    var result = await productModel.getProductByIdNotCheckTime(index);
    var seller = await userModel.getUserById(result[0].seller_id);
    var currentBidPrice = await bidModel.getCurrentBid(result[0].product_id);
    var productBid = await bidModel.getByProductBidPrice(
        result[0].product_id,
        currentBidPrice.price
    );

    const minBid = currentBidPrice.price + result[0].step_price;
    const currentDate = new Date();
    const end_date = (moment.utc(result[0].end_date).local() - currentDate) / 1000;

    let end = "";

    let bidAvailable = true;

    let success = req.cookies["bidSuccessMessage"];
    let error = req.cookies["bidErrorMessage"];
    res.clearCookie("bidSuccessMessage");
    res.clearCookie("bidErrorMessage");

    if(end_date < 0) {
      end = result[0].end_date;
      bidAvailable = false;
      error = "Product out of time";
    } else if (end_date > 86400 ) {
        end = result[0].end_date;
    } else {
        const day = end_date / 86400;
        const hour = (end_date % 86400) / 3600;
        const min = ((end_date % 86400) % 3600) / 60;
        const sec = ((end_date % 86400) % 3600) % 60;
        if (Math.floor(day) > 0) {
            end = Math.floor(day) + " days left.";
        } else if (Math.floor(hour) > 0) {
            end = Math.floor(hour) + " hours left.";
        } else if (Math.floor(min) > 0) {
            end = Math.floor(min) + " mins left.";
        } else if (Math.floor(sec) > 0) {
            end = Math.floor(sec) + " secs left.";
        }
    }
    const user = req.session.authUser;
    let isMerchant = false;
    if (user !== null) {
        if (user.type === 1) {
            if(seller.user_id === result[0].seller_id) {
              isMerchant = true
            }
        }
    }

    let sellerName = seller.name;
    if (sellerName.length > 5) {
        sellerName = "*****" + sellerName.substr(5);
    } else {
        sellerName = "***" + sellerName.substr(3);
    }

    if (productBid === null) {
        res.render("item", {
            err_message: error,
            success_message: success,
            item: result[0],
            seller: seller,
            sellerName: sellerName,
            bidAvailable: bidAvailable,
            bidder: null,
            end_date: end,
            isMerchant: isMerchant,
            minBid: result[0].first_price,
            current_price: result[0].first_price,
            empty: result.length === 0
        });
    } else {
        
        var bidder = await userModel.getUserById(productBid.user_id);
        //Get History
        var history = await bidModel.getTopBidder(result[0].product_id);
        var historyBidder = [];
        for (i = 0; i < history.length; i++) {
            const userBidHis = await userModel.getUserById(history[i].user_id);
            let name = "";
            if (userBidHis.name.length > 5) {
                name = "*****" + userBidHis.name.substr(5);
            } else {
                name = "**" + userBidHis.name.substr(2);
            }

            const entity = {
                order: i + 1,
                time: moment(history[i].bid_time, 'MMM dd YYYY').format('HH:mm DD/MM/YYYY'),
                name: name,
                price: history[i].bid_price
            }
            historyBidder.push(entity)
        }

        let bidderName = bidder.name;
        if (bidderName.length > 5) {
            bidderName = "*****" + bidderName.substr(5);
        } else {
            bidderName = "***" + bidderName.substr(3);
        }

        
        res.render("item", {
            err_message: error,
            success_message: success,
            item: result[0],
            seller: seller,
            sellerName: sellerName,
            bidder: bidder,
            bidAvailable: bidAvailable,
            bidderName: bidderName,
            end_date: end,
            minBid: minBid,
            current_price: currentBidPrice.price,
            bidderHistory: historyBidder,
            isMerchant: isMerchant,
            empty: result.length === 0
        });
    }
});

router.post("/item/:index/normalBid", async function(req, res) {
    var index = req.params.index;
    const user = req.session.authUser;
    var result = await productModel.getById(index);
    var currentBidPrice = await bidModel.getCurrentBid(result[0].product_id);
    let minBid = currentBidPrice.price + result[0].step_price;
    if (currentBidPrice.price === null) {
        minBid = result[0].first_price;
    }

    const price = req.body.price;

    let isBanned = false;

    if (user !== null) {
        isBanned = await productModel.checkIsBan(index, user.user_id);
    }

    if (user === null) {
        res.cookie("bidErrorMessage", "You must login to bid.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else if (isBanned) {
        res.cookie("bidErrorMessage", "You was banned by merchant.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else if (user.rate < 4) {
        res.cookie("bidErrorMessage", "Your rating point less than 80%.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else {
        if (price < minBid) {
            res.cookie("bidErrorMessage", "Bid value invalid.", {
                maxAge: 900000,
                httpOnly: true
            });
        } else {
            await bidModel.deleteBid(result[0].product_id, user.user_id);
            const currentBidId = await bidModel.getCurrentBidId();
            const entity = {
                bid_id: currentBidId.id + 1,
                product_id: index,
                user_id: user.user_id,
                bid_time: new Date(),
                bid_price: price
            };
            res.cookie("bidSuccessMessage", "Bid Item Successful.", {
                maxAge: 900000,
                httpOnly: true
            });
            const rt = bidModel.add(entity);
            checkAutoBid(index, result[0].step_price);
        }
    }
    res.redirect("/item/" + index);
});

async function checkAutoBid(product_id, step_price) {
    const autoBids = await bidModel.getAllBidAuto(product_id);
    if (autoBids === null) {
        return;
    }
    //Find max autoBidPrice
    const maxBidValue = await bidModel.getMaxBidAuto(product_id); //get max value in autobid list
    const secondBidValue = await bidModel.getMaxBidAutoExcept(product_id, maxBidValue.value); //get second max value in autobid
    const maxPrice = await bidModel.getCurrentBid(product_id); // get max price hien tai user1 vua bid thanh cong

    if (maxPrice.price > maxBidValue.value) {
        // Tat ca auto bid -> max value
        for (i = 0; i < autoBids.length; i++) {
            const userBid = await userModel.getUserById(autoBids[i].user_id); // -> mail
            const product = await productModel.getById(product_id); // -> ten + autoBids[i].maxAutoBid
            await bidModel.changeBidPrice(
                autoBids[i].bid_id,
                autoBids[i].maxAutoBid,
                new Date()
            );
        }
    } else if (maxPrice.price < maxBidValue.value) {

        if (secondBidValue === null) {
            if ((maxPrice.price + step_price) < maxBidValue.value) {
                const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
                await bidModel.changeBidPrice(
                    bidder.bid_id,
                    maxPrice.price + step_price,
                    new Date()
                );
            } else {
                const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
                await bidModel.changeBidPrice(
                    bidder.bid_id,
                    maxBidValue.value,
                    new Date()
                );
            }
        } else {
            if ((secondBidValue.value + step_price) < maxBidValue.value) {
                const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
                await bidModel.changeBidPrice(
                    bidder.bid_id,
                    secondBidValue.value + step_price,
                    new Date()
                );
                // for(i = 0; i < autoBids.length;  i++) {
                //     if(autoBids[i].maxAutoBid != maxBidValue.value) {
                //         await bidModel.changeBidPrice(
                //             autoBids[i].bid_id,
                //             autoBids[i].maxAutoBid,
                //             new Date()
                //         );
                //     }
                // }
            } else {

                const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
                await bidModel.changeBidPrice(
                    bidder.bid_id,
                    maxBidValue.value,
                    new Date()
                );
            }

            for (i = 0; i < autoBids.length; i++) {
                if (autoBids[i].maxAutoBid != maxBidValue.value) {
                    await bidModel.changeBidPrice(
                        autoBids[i].bid_id,
                        autoBids[i].maxAutoBid,
                        new Date()
                    );
                }
            }

        }
    } else { // ===
        const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
        await bidModel.changeBidPrice(
            bidder.bid_id,
            maxBidValue.value,
            new Date()
        );
    }

}

router.post("/item/:index/autoBid", async function(req, res) {


    var index = req.params.index;
    const user = req.session.authUser;
    var result = await productModel.getById(index);
    var currentBidPrice = await bidModel.getCurrentBid(result[0].product_id);
    let minBid = currentBidPrice.price + result[0].step_price;

    const price = req.body.price;
    const maxPrice = req.body.max_price;
    if (currentBidPrice.price === null) {
        minBid = result[0].first_price;
    }

    let isBanned = false;

    if (user !== null) {
        isBanned = await productModel.checkIsBan(index, user.user_id);
    }

    if (user === null) {
        res.cookie("bidErrorMessage", "You must login to bid.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else if (isBanned) {
        res.cookie("bidErrorMessage", "You was banned by merchant.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else if (user.rate < 4) {
        res.cookie("bidErrorMessage", "Your rating point less than 80%.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else if (maxPrice < price) {
        res.cookie("bidErrorMessage", "Max price must be more than price.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else if (price < minBid) {
        res.cookie("bidErrorMessage", "Bid value invalid.", {
            maxAge: 900000,
            httpOnly: true
        });
    } else {
        await bidModel.deleteBid(result[0].product_id, user.user_id);
        const currentBidId = await bidModel.getCurrentBidId();
        const entity = {
            bid_id: currentBidId.id + 1,
            product_id: index,
            user_id: user.user_id,
            bid_time: new Date(),
            bid_price: price,
            isAutoBid: 1,
            maxAutoBid: maxPrice
        };
        const rt = await bidModel.add(entity);
        res.cookie("bidSuccessMessage", "Bid Item Successful.", {
            maxAge: 900000,
            httpOnly: true
        });
        checkAutoBid(index, result[0].step_price);
    }
    res.redirect("/item/" + index);
});

router.get("/item/:index/bid", async function(req, res) {
    //get param

    var index = parseInt(req.params.index);
    var result = await productModel.getById(index);
    console.log(result);
    res.render("itemBid", result[0]);
});

router.get("/item/:index/review", function(req, res) {
    //get param
    var productType = req.params.type.normalize();
    var index = parseInt(req.params.index);
    if (productType === "all") {
        item = products.all.content.items[index];
        res.render("itemReview", item);
    } else {
        item = products.homepageItems.find(
            item => item.content.title === productType
        ).content.items[index];
        res.render("user_page/commentrate", item);
    }
});

router.get("/item/:index/edit", async function(req, res) {
    if (req.session.authUser === undefined || req.session.authUser.type === 0) {
        res.status(404).render('pageNotFound');
        return;
    }

    var index = parseInt(req.params.index);
    var result = await productModel.getById(index);

    console.log(result);
    if (result.length > 0) {
        res.render('merchant/editProductDescription', { item: result[0] });
    } else {
        res.status(404).render('pageNotFound');
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

router.get('/item/:index/deny', async function(req, res) {
    var index = parseInt(req.params.index);
    const bidder = await bidModel.getBidWithProductId(index);
    var result = [];
    console.log(bidder);
    if (bidder !== null) {
        for (i = 0; i < bidder.length; i++) {
            const user = await userModel.getUserById(bidder[i].user_id);
            const entity = {
                id: user.user_id,
                name: user.name,
                price: bidder[i].bid_price,
                rate: user.rate,
                index: index,
            }
            result.push(entity);
        }
    }
    res.render('denyView', {
        bidder: result
    });
});

router.post('/item/:index/:id/deny', async function(req, res) {
    var index = parseInt(req.params.index);
    const user_id = parseInt(req.params.id);
    const banId = await productModel.getMaxBanId();
    const entity = {
        ban_id: banId + 1,
        user_id: user_id,
        product_id: index
    }

    const rs = await productModel.addBanAccount(entity);
    denyHandle(index, user_id);

    var product = await productModel.getById(index);
    var user = await userModel.getUserById(user_id);
    sendMailNormalBid(user, "Denied", product[0].brand + product[0].model, "Id:" + (banId + 1), "You were denied to bid this product", 2);

    res.redirect("/item/" + index + "/deny");
})

async function denyHandle(product_id, user_id) {
    await bidModel.deleteBid(product_id, user_id);
};

module.exports = router;