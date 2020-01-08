var express = require("express");
var router = express.Router();
const productModel = require("../models/product.model");
const watchlistModel = require("../models/watchlist.model");
const userModel = require("../models/user.model");
const bidModel = require("../models/bid.model");
const moment = require('moment');

router.get("/watchlist", async function(req, res, next) {
  res.render("bidder/watchList", { title: "Betview" });
});

router.post("/watchlist", async function(req, res, next) {
  if (req.session.authUser === null || req.session.authUser === undefined) {
    res
      .status(404) // HTTP status 404: NotFound
      .send("Not found");
    return;
  }
  var productId = req.body.product_id;
  var userId = req.session.authUser.user_id;

  var result = await watchlistModel.add(userId, productId);

  // if(result){
  //     res.redirect(`/item/${productId}`)
  // }
});

router.get("/betview", function(req, res, next) {
  res.render("betview", { title: "Betview" });
});

router.get("/item/:index", async function(req, res) {
  var index = req.params.index;

  var result = await productModel.getById(index);
  var seller = await userModel.getUserById(result[0].seller_id);
  var currentBidPrice = await bidModel.getCurrentBid(result[0].product_id);
  var productBid = await bidModel.getByProductBidPrice(
    result[0].product_id,
    currentBidPrice.price
  );

  const minBid = currentBidPrice.price + result[0].step_price;
  const currentDate = new Date();
  const end_date = (result[0].end_date - currentDate) / 1000;

  let end = "";

  if (end_date > 86400) {
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

  const success = req.cookies["bidSuccessMessage"];
  const error = req.cookies["bidErrorMessage"];
  res.clearCookie("bidSuccessMessage");
  res.clearCookie("bidErrorMessage");

  if(productBid === null) {
    res.render("item", {
        err_message: error,
        success_message: success,
        item: result[0],
        seller: seller,
        bidder: null,
        end_date: end,
        minBid: result[0].first_price,
        current_price: result[0].first_price,
        empty: result.length === 0
      });
  } else {
    const user =  req.session.authUser;
    var bidder = await userModel.getUserById(productBid.user_id);
    //Get History
    var history = await bidModel.getTopBidder(result[0].product_id);
    var historyBidder = [];
    for(i = 0 ; i < history.length ; i++) {
        const userBidHis = await userModel.getUserById(history[i].user_id);
        const entity = {
            order: i + 1,
            time: moment(history[i].bid_time,'MMM dd YYYY').format('HH:mm DD/MM/YYYY'),
            name: userBidHis.name,
            price: history[i].bid_price
        }
        historyBidder.push(entity)
    }
    let isMerchant = false;
    if(user.type ===  1)  {
        isMerchant = true;
    }
    res.render("item", {
      err_message: error,
      success_message: success,
      item: result[0],
      seller: seller,
      bidder: bidder,
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
  const minBid = currentBidPrice.price + result[0].step_price;

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

      
      checkAutoBid(index, result[0].step_price);
    }
  }
  res.redirect("/item/" + index);
});

async function checkAutoBid(product_id, step_price) {
  const autoBids = await bidModel.getAllBidAuto(product_id);

  //Find max autoBidPrice
  const maxBidValue = await bidModel.getMaxBidAuto(product_id);
  const secondBidValue  = await bidModel.getMaxBidAutoExcept(product_id, maxBidValue.value);
  const maxPrice = await bidModel.getCurrentBid(product_id);
  
  if(maxPrice.price > maxBidValue.value) {
    for(i = 0; i < autoBids.length;  i++) {
        await bidModel.changeBidPrice(
        autoBids[i].bid_id,
        autoBids[i].maxAutoBid,
        new Date()
      );
    }
  } else if(maxPrice.price < maxBidValue.value) {
    if(secondBidValue === null) {
        if ((maxPrice.price + step_price) < maxBidValue.value ){
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
        if((secondBidValue.value + step_price) < maxBidValue.value) {
            const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
            await bidModel.changeBidPrice(
                bidder.bid_id,
                secondBidValue.value + step_price,
                new Date()
            );
            for(i = 0; i < autoBids.length;  i++) {
                if(autoBids[i].maxAutoBid != maxBidValue.value) {
                    await bidModel.changeBidPrice(
                        autoBids[i].bid_id,
                        autoBids[i].maxAutoBid,
                        new Date()
                    );
                }
            }
        } else {
            const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
            await bidModel.changeBidPrice(
                bidder.bid_id,
                maxBidValue.value,
                new Date()
            );
        }
    }
  } else {
    const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
    await bidModel.changeBidPrice(
        bidder.bid_id,
        maxBidValue.value,
        new Date()
    );
  }

}

router.post("/item/:index/autoBid", async function(req, res) {
  console.log("Inside");

  var index = req.params.index;
  const user = req.session.authUser;
  var result = await productModel.getById(index);
  var currentBidPrice = await bidModel.getCurrentBid(result[0].product_id);
  const minBid = currentBidPrice.price + result[0].step_price;

  const price = req.body.price;
  const maxPrice = req.body.max_price;

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

    /////////////////////////////////////////////////////////////// ADD EMAIL 


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

router.get("/otp", (req, res) => {
  res.render("otpMail", { title: "OTP" });
});

router.get("/404", (req, res) => {
  res.render("pageNotFound", { title: "404" });
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
