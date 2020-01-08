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
  
  console.log(result[0].end_date);
  console.log(currentDate);

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

const nodemailer = require('nodemailer');

async function sendMailNormalBid(user, price, productName, merchantName)
{
  console.log(1234);
  const output = await
  `	
  <div class=""><div class="aHl"></div><div id=":38" tabindex="-1"></div><div id=":cr" class="ii gt"><div id=":37" class="a3s aXjCH "><div class="adM">	
  </div><div marginwidth="0" marginheight="0" style="background-color:#f1f1f1;min-width:600px;padding:0"><div class="adM">
  </div><table width="100%" style="background-color:#f1f1f1;min-width:600px" bgcolor="#f1f1f1">
    <tbody><tr>
    <td align="center" valign="top" width="100%" style="min-width:600px">
    <center>
    
    
    <table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0" bgcolor="#f1f1f1">
    
    <tbody><tr>
      <td align="center">
      <table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0">
      <tbody><tr height="50">
      <td width="100%" height="50" style="line-height:1px;font-size:1px">&nbsp;</td>
      </tr>
      <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" style="min-width:600px">
        <tbody><tr>
        <td valign="middle" align="center">
        <div style="max-height:50px">
          <div>
          <a><img align="none" alt="Auction" border="0" hspace="0" src="../public/images/logo-small.JPG" style="max-width:70px;height:auto;display:block;margin:0px" title="" vspace="0" width="70px" class="CToWUd">
          </a>
          </div>
        </div>
        </td>
        </tr>
        </tbody></table>
      </td>
      </tr>
      </tbody></table>
      <table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0">
      <tbody><tr>
      <td align="center">
        <table width="560" border="0" cellpadding="0" cellspacing="0" style="min-width:560px">
        <tbody><tr height="50">
        <td width="100%" height="50" style="line-height:1px;font-size:1px">&nbsp;</td>
        </tr>
        <tr>
        <td width="560" align="center" style="font-family:arial,helvetica,sans-serif;font-weight:bold;font-size:50px;color:#313131;text-align:left;line-height:75px">
        <div style="text-align:center;line-height:75px">
        Notification
        </div>
  
        </td>
        </tr>
        <tr height="30">
        <td width="100%" height="30" style="line-height:1px;font-size:1px">&nbsp;</td>
        </tr>
        </tbody></table>
      </td>
      </tr>
      </tbody></table>
      </td>
    </tr>
    </tbody></table>
    
    
    
    <table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0" bgcolor="#f1f1f1">
    
    <tbody><tr>
      <td align="center">
      <table width="600" style="min-width:600px;background-color:#ffffff" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0">
      <tbody><tr>
      <td align="center">
        <table width="560" border="0" cellpadding="0" cellspacing="0" style="min-width:560px">
        <tbody><tr height="30">
        <td width="100%" height="30" style="line-height:1px;font-size:1px">&nbsp;</td>
        </tr>
        <tr>
        <td width="560" align="center" style="font-family:arial,helvetica,sans-serif;font-size:16px;color:#313131;text-align:left;line-height:24px">
          <div style="text-align:center;line-height:24px">
          <span style="font-size:18px">
            <strong>Hi ` + user.name +`</strong>
    </span>
    <br>
    You have bidded product<br><br>
    <span style="font-size:35px"><strong>`
    + productName +
    `</strong></span><br>
    </div>
  </td>
  </tr>
  <tr height="15">
  <td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table>
  
  
  
  <table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0">
  
  <tbody><tr>
  <td align="center">
  <table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff">
  <tbody><tr>
  <td align="center">
  <table width="540" border="0" cellspacing="0" cellpadding="0">
  <tbody><tr>
  <td style="font-family:arial,helvetica,sans-serif;text-transform:uppercase;font-size:14px;color:#b2b2b2;text-align:left;line-height:24px">
    <div style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#b2b2b2;text-align:left">
    <strong>BID INFORMATION:</strong>
    </div>
  </td>
  </tr>
  <tr height="1">
  <td width="100%" height="1" style="line-height:1px;font-size:1px;background-color:#e2e3e4">&nbsp;</td>
  </tr>
  <tr height="15">
  <td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table>
  
  
  
  <table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0">
  
  <tbody><tr>
  <td align="center">
  <table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff">
  <tbody><tr height="15">
  <td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td>
  </tr>
  <tr>
  <td align="center">
  <table width="540" border="0" cellspacing="0" cellpadding="0">
  <tbody><tr>
  <td>
    <table align="left" border="0" cellpadding="0" cellspacing="0" width="270" style="min-width:270px">
  <tbody><tr>
  <td align="center">
    <div style="font-family:Ariel,Helvetica,sans-serif;font-size:16px;color:#313131;text-align:left;line-height:24px">
    <strong>Your product:</strong><br>`+productName+`<br><br>
  <strong>Price bid:</strong><br>`
  
  + price +

  `<br>
  </div>
  </td>
  </tr>
  </tbody></table>
  <table align="right" border="0" cellpadding="0" cellspacing="0" width="270" style="min-width:270px">
  <tbody><tr>
  <td align="center">
  <div style="font-family:Ariel,Helvetica,sans-serif;font-size:16px;color:#313131;text-align:left;line-height:24px">
    <strong>Your eMail:</strong><br>
    <a>`
    +user.email+
    `</a><br><br>
    <strong>Merchant:</strong><br>
    `
    
    +merchantName+`
    
    <br>
  </div>
  </td>
  </tr>
  <tr height="1">
  <td width="100%" height="1" style="line-height:1px;font-size:1px">&nbsp;</td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  <tr height="15">
  <td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table>
  
  
  
  
  
  
  <table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0">
  
  <tbody><tr>
  <td align="center">
  <table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff">
  <tbody><tr height="15">
  <td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td>
  </tr>
  <tr>
  <td align="center">
  <table width="540" border="0" cellspacing="0" cellpadding="0">
  <tbody><tr>
  <td>
    
  
  </td>
  </tr>
  <tr height="15">
  <td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table>
  
  
  
  
  
  
  
  
  
  <table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0">
  <tbody><tr>
  <td align="center">
  <table width="600" border="0" cellpadding="0" cellspacing="0" style="min-width:600px">
  <tbody><tr height="15">
  <td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td>
  </tr>
  <tr>
  <td align="center">
  <table width="560" border="0" cellpadding="0" cellspacing="0" style="min-width:560px">
  <tbody><tr>
  
    <td align="center">
    <div style="font-family:ariel,helvetica,sans-serif;font-weight:bold;font-size:14px;color:#313131;text-align:center;line-height:26px">
    Need Help? <a style="text-decoration:none;color:#6bae7c">online.auction.com</a><br>
    </div>
    </td>
  
  </tr>
  <tr height="20">
  <td width="100%" height="20" style="line-height:1px;font-size:1px">&nbsp;</td>
  </tr>
  <tr>
  
  <td align="center">
  <div style="font-family:ariel,helvetica,sans-serif;font-size:12px;color:#858585;text-align:center;line-height:20px">
    <p>© 2019 - 2020 Online Auction, Inc. All rights reserved. Bid, Bidding Phone Page, Bidding Laptop Page, the Anction logo, Unreal, Unreal Engine 4 are trademarks or registered trademarks of Online Auction, Inc. in the VietNam and elsewhere. Other brands and product names are the trademarks of their respective owners.</p>
    </div>
  </td>
  
  </tr>
  <tr>
  <td align="center" style="color:#313131">&nbsp;</td>
  </tr>
  <tr>
  <td align="center" style="color:#313131;font-size:10px"><p>HCM University of Science</p></td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table>
  </td>
  </tr>
  </tbody></table><div></div><div>
  
  </div></center></td></tr></tbody></table></div><div class="yj6qo"></div><div class="adL">
  
  </div><div id="m_5228510856841251486:n6" style="display:none" class="adL"><div id="m_5228510856841251486:n7"></div></div><div class="adL"></div></div></div><div id=":d4" class="ii gt" style="display:none"><div id=":d3" class="a3s aXjCH undefined"></div></div><div class="hi"></div></div>
`;


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

  console.log(user.email);
	// setup email data with unicode symbols
	let mailOptions = await {
		from: '"Online Auction" <derekzohar@gmail.com>', // sender address
		//to: 'ngovietthangww@gmail.com', // list of receivers
		to: 'vfd9350@gmail.com',
		subject: 'Node Contact Request', // Subject line
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
  if(currentBidPrice.price === null) {
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
      sendMailNormalBid(user, price, productModel.getById(index).length, productModel.getById(result[0].product_id));
      
      checkAutoBid(index, result[0].step_price);
    }
  }
  res.redirect("/item/" + index);
});

// sendMail(userModel.getUserById(8));

async function checkAutoBid(product_id, step_price) {
  const autoBids = await bidModel.getAllBidAuto(product_id);
  if(autoBids === null){
    return;
  }
  //Find max autoBidPrice
  const maxBidValue = await bidModel.getMaxBidAuto(product_id); //get max value in autobid list
  const secondBidValue  = await bidModel.getMaxBidAutoExcept(product_id, maxBidValue.value); //get second max value in autobid
  const maxPrice = await bidModel.getCurrentBid(product_id); // get max price hien tai user1 vua bid thanh cong
  
  console.log(1234123123123 + " " + maxPrice.price + " " + maxBidValue.value);
  if(maxPrice.price > maxBidValue.value) {
    console.log(1);
    // Tat ca auto bid -> max value
    for(i = 0; i < autoBids.length;  i++) {
      // const userBid = await userModel.getUserById(autoBids[i].user_id); // -> mail
      // const product = await productModel.getById(product_id); // -> ten + autoBids[i].maxAutoBid
        await bidModel.changeBidPrice(
        autoBids[i].bid_id,
        autoBids[i].maxAutoBid,
        new Date()
      );
      sendMailNormalBid(bidder, price, productName, merchantName);
    }
  } else if(maxPrice.price < maxBidValue.value) {
    console.log(2);

    if(secondBidValue === null) {
        if ((maxPrice.price + step_price) < maxBidValue.value ){
            const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
            await bidModel.changeBidPrice(
                bidder.bid_id,
                maxPrice.price + step_price,
                new Date()
            );
            
            sendMailNormalBid(bidder, price, productName, merchantName);
        } else {
            const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
            await bidModel.changeBidPrice(
                bidder.bid_id,
                maxBidValue.value,
                new Date()
            );
            sendMailNormalBid(bidder, price, productName, merchantName);
        }
    } else {
      console.log(3);

        if((secondBidValue.value + step_price) < maxBidValue.value) {
            const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
            await bidModel.changeBidPrice(
                bidder.bid_id,
                secondBidValue.value + step_price,
                new Date()
            );
            sendMailNormalBid(bidder, price, productName, merchantName);
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
            sendMailNormalBid(bidder, price, productName, merchantName);       
        }

        for(i = 0; i < autoBids.length;  i++) {
          if(autoBids[i].maxAutoBid != maxBidValue.value) {
              await bidModel.changeBidPrice(
                  autoBids[i].bid_id,
                  autoBids[i].maxAutoBid,
                  new Date()
              );
              sendMailNormalBid(bidder, price, productName, merchantName);
          }
      }

    }
  } else { 
    // ===
    console.log(4);

    const bidder = await bidModel.getMaxBidderAuto(product_id, maxBidValue.value);
    await bidModel.changeBidPrice(
        bidder.bid_id,
        maxBidValue.value,
        new Date()
    );
    sendMailNormalBid(bidder, price, productName, merchantName);
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
  if(currentBidPrice.price === null) {
    minBid = result[0].first_price;
  }
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
    sendMailNormalBid(user, price, productName, merchantName);

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
