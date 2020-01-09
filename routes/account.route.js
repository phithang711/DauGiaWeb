var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../models/user.model");
const config = require("../configs/userModelConfig.json");

const toMerchant = require('../models/tomerchant');
const ListBid = require('../models/user.profile.js')

const nodemailer = require('nodemailer');

const commentModel = require('../models/comment.model');

router.get("/login", function(req, res, next) {
    res.render("login", { title: "AuctionDealer Login", layout: false });
});


router.get('/login', function(req, res, next) {
    res.render('login', { title: 'AuctionDealer Login', layout: false });
});

router.get("/signup", function(req, res, next) {
    res.render("signup", { title: "AuctionDealer Sign up", layout: false });
});

router.post("/signup", async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    const user = await userModel.checkUsernameIsExisted(email);
    if (user !== null) {
        return res.render("signup", {
            layout: false,
            err_message: "Username is existed."
        });
    }
    console.log(config.authentication.saltRounds);
    const hash = bcrypt.hashSync(password, config.authentication.saltRounds);
    const entity = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        type: 0
    };
    const ret = await userModel.add(entity);
    res.redirect("/login");
});

router.post("/logout", async function(req, res) {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    req.session.save(function(err) {
        if (err) {
            return;
        }
        res.redirect('/');
    })
});

const local = require("../middlewares/local.mdw");

router.post("/login", async function(req, res) {
    var email = req.body.email;
    var password = req.body.pass;
    const user = await userModel.checkUsernameIsExisted(email);
    if (user === null) {
        return res.render("login", {
            layout: false,
            err_message: "Invalid username or password."
        });
    }
    const rs = bcrypt.compareSync(password, user.password);
    if (rs === false) {
        return res.render("login", {
            layout: false,
            err_message: "Invalid username or password."
        });
    }

    delete user.password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;
    const url = req.query.retUrl || "/";

    req.session.save(function(err) {
        if (err) {
            return;
        }
        res.redirect(url);
    })
});

router.get("/account/profile", function(req, res) {
    const user = req.session.authUser;
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    let isBuyer = false;
    let isAdmin = false;
    let isMerchant = false;
    if (user.type == 0) {
        isBuyer = true;
    } else if (user.type == 1) {
        isMerchant = true;
    } else if (user.type == 2) {
        isAdmin = true;
    }

    var rate = 0;
    if (user.rate > 0) {
        rate = user.rate;
    }

    const date = moment.utc(user.DOB).local().format('DD-MM-YYYY');
    res.render("accountProfile", {
        user: user,
        rate: rate,
        date: date,
        isReader: isBuyer,
        isMerchant: isMerchant,
        isAdmin: isAdmin
    });
});

router.get("/profile/changeProfile", function(req, res) {
	const user = req.session.authUser;

    let isBuyer = false;
    let isAdmin = false;
    let isMerchant = false;
    if (user.type == 0) {
        isBuyer = true;
    } else if (user.type == 1) {
        isMerchant = true;
    } else if (user.type == 2) {
        isAdmin = true;
    }

    res.render("changeProfile", {
        user: user,
        isReader: isBuyer,
        isMerchant: isMerchant,
        isAdmin: isAdmin
    });
});

router.post("/profile/changeProfile", async function(req, res) {
    let user = req.session.authUser;

    const email = req.body.email;
    const phone = req.body.phone;
    const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(dob);
    console.log(req.body.phone);
    const name = req.body.name;
    user.email = email;
    user.phone = phone;
    user.DOB = dob;
    user.name = name;
    req.session.authUser = user;
    await userModel.changeProfile(user);
    let isBuyer = false;
    let isAdmin = false;
    let isMerchant = false;
    if (user.type == 0) {
        isBuyer = true;
    } else if (user.type == 1) {
        isMerchant = true;
    } else if (user.type == 2) {
        isAdmin = true;
    }
    res.render("accountProfile", {
        user: user,
        isReader: isBuyer,
        isMerchant: isMerchant,
        isAdmin: isAdmin
    });
});

router.get('/account/profile', function(req, res) {
    const user = req.session.authUser;
    let isBuyer = false;
    let isAdmin = false;
    let isMerchant = false;
    if (user.type == 0) {
        isBuyer = true;
    } else if (user.type == 1) {
        isMerchant = true;
    } else if (user.type == 2) {
        isAdmin = true;
    }
    res.render('accountProfile', {
        user: user,
        isBuyer: isBuyer,
        isMerchant: isMerchant,
        isAdmin: isAdmin
    });
});

function generateOTP() {
    // Declare a digits variable
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

var verifyCode = generateOTP();
router.post('/send-otp', (req, res) => {
    const otp = `${req.body.number1}` + `${req.body.number2}` + `${req.body.number3}` + `${req.body.number4}`;

    if (otp === verifyCode) {
        //home page
        console.log("home page");
    } else {
        //reload otpMail page
    }
    // console.log(otp);
});

router.get("/account/profile", function(req, res) {
    const user = req.session.authUser;
    let isBuyer = false;
    let isAdmin = false;
    let isMerchant = false;
    if (user.type == 0) {
        isBuyer = true;
    } else if (user.type == 1) {
        isMerchant = true;
    } else if (user.type == 2) {
        isAdmin = true;
    }
    res.render("accountProfile", {
        user: user,
        isBuyer: isBuyer,
        isMerchant: isMerchant,
        isAdmin: isAdmin
    })
});

router.post('/tomerchant', async function(req, res) {
    if (req.session.authUser === null || req.session.authUser.type === "1" || req.session.authUser.type === "2" || req.session.authUser.type === undefined) {
        res.status(404) // HTTP status 404: NotFound
            .send('Not found');
        return;
    }
    console.log(req.session.authUser.email);
    var checkadd = await toMerchant.add(req.session.authUser.email);
    if (checkadd == true) {
        res.redirect(req.get('referer'));
    } else {
        console.log("failed redirect");
    }
});

router.get("/profile/changePassword", function(req, res) {
    const user = req.session.authUser;
    let isBuyer = false;
    let isAdmin = false;
    let isMerchant = false;
    if (user.type == 0) {
        isBuyer = true;
    } else if (user.type == 1) {
        isMerchant = true;
    } else if (user.type == 2) {
        isAdmin = true;
    }

    res.render("changePassword", {
        isReader: isBuyer,
        isMerchant: isMerchant,
        isAdmin: isAdmin
    });
});

router.post("/profile/changePassword", async function(req, res) {
    const user = await userModel.getUserById(req.session.authUser.user_id);
    let isBuyer = false;
    let isAdmin = false;
    let isMerchant = false;
    if (user.type == 0) {
        isBuyer = true;
    } else if (user.type == 1) {
        isMerchant = true;
    } else if (user.type == 2) {
        isAdmin = true;
    }
    let rewrite = req.body.rewrite;
    let newPassword = req.body.newPassword;
    let oldPassword = req.body.oldPassword;

    const rs = bcrypt.compareSync(oldPassword, user.password);

    if (!rs) {
        res.render("changePassword", {
            err_message: "Wrong old password!",
            isReader: isBuyer,
            isMerchant: isMerchant,
            isAdmin: isAdmin
        });
        res.end;
    } else {
        if (newPassword !== rewrite) {
            res.render("changePassword", {
                err_message: "Rewrite new password don't match new password!",
                isReader: isBuyer,
                isMerchant: isMerchant,
                isAdmin: isAdmin
            });
            res.end;
        } else {
            var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            if (!re.test(newPassword)) {
                res.render("changePassword", {
                    err_message: "New Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase.",
                    isReader: isBuyer,
                    isMerchant: isMerchant,
                    isAdmin: isAdmin
                });
                res.end;
            } else {
                const hash = bcrypt.hashSync(newPassword, config.authentication.saltRounds);
                console.log(hash);
                await userModel.changePassword(hash, user.user_id);
                res.render("changePassword", {
                    success_message: "Change password success.",
                    isReader: isBuyer,
                    isMerchant: isMerchant,
                    isAdmin: isAdmin
                });
            }
        }
    }
});
router.get('/ListBidding', async function(req, res, next) {
    const itemList = await ListBid.listBidList(req.session.authUser.email)
    console.log(itemList);
    res.render('listbidmanage', { items: itemList });
});

router.get('/WonBidList', async function(req, res, next) {
    const itemList = await ListBid.wonBidList(req.session.authUser.email)
    console.log(itemList);
    res.render('wonbidlist', { items: itemList });
});

router.get('/PendingBidItemList', async function(req, res, next) {
    const itemList = await ListBid.PendingBidItemList(req.session.authUser.email)

    console.log(itemList);
    res.render('pendingbiditemlist', { items: itemList });
});

router.get('/FinishBidItemList', async function(req, res, next) {
    const itemList = await ListBid.FinishedBidItemList(req.session.authUser.email)

    console.log(itemList);
    res.render('finishbiditemlist', { items: itemList });
});

router.post('/FinishBidItemList/:seller_id/:productId/:type', function (req,res) {  
	const type = req.params.type;
	const seller_id = req.params.seller_id;
	const id = parseInt(req.params.productId);
	res.cookie('commentSeller', seller_id, {
		maxAge: 900000,
		httpOnly: true
	});
	res.cookie('commentProductId', id, {
		maxAge: 900000,
		httpOnly: true
	});

	res.cookie('commentType', type, {
		maxAge: 900000,
		httpOnly: true
	});
	res.redirect('/itemReview');
});

router.get('/itemReview',async function (req,res) {
	const message = req.cookies['messageReview'];
	res.clearCookie('messageReview');
	res.render('itemReview', {
		message: message
	});
});


router.post('/itemReview',async function (req, res) {
	const seller_id = req.cookies["commentSeller"];
	const id = req.cookies["commentProductId"];
	const type = req.cookies["commentType"];
	res.clearCookie("commentSeller");
	res.clearCookie("commentProductId");
	res.clearCookie("commentType");
	const rate  = parseInt(req.body.ratingValue);
	const content  = req.body.textContent;
	
	let id1 = 0;
	let id2 = 0;
	const user = req.session.authUser;
	const seller = await userModel.getUserById(seller_id);

	console.log(user);
	console.log(seller);

	if(type === 0){
		id2 = seller.user_id;
		id1 = user.user_id;
	} else {
		id1 = seller.user_id;
		id2 = user.user_id;
	}

	let avg = (user.rate + rate )/ 2;
	await userModel.updateUserRate(avg, user.user_id);

	const entity = {
		user_id: id1,
		product_id:  id,
		content: content,
		rate:  rate,
		type:type,
		time: new Date(),
		user_id2: id2
	}

	await commentModel.add(entity);

	res.cookie('messageReview', 'Review Successful',{
		maxAge: 900000,
		httpOnly: true
	});
	res.redirect('/itemReview');
});

router.get('/allBidListItem', async function(req, res, next) {
    const itemList = await ListBid.AllBidItemList(req.session.authUser.email)

    console.log(itemList);
    res.render('allbidlistitem', { items: itemList });
});

router.post('/send', (req, res) => {
    const output =
        `	
	<div marginwidth="0" marginheight="0" style="background-color:#f1f1f1;min-width:600px;padding:0">
	<table width="100%" style="background-color:#f1f1f1;min-width:600px" bgcolor="#f1f1f1">
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
								<a><img align="none" alt="Auction" border="0" hspace="0" src="../public/images/logo-small.JPG" style="max-width:70px;height:auto;display:block;margin:0px" title="Epic Games" vspace="0" width="70px" class="CToWUd">
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
							Thank You.
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
										<strong>Hi ` +
        req.body.name +
        `</strong>
		</span>
		<br>
		Thanks for your purchase from Online Auction<br><br>
		<span style="font-size:35px"><strong> VERIFY CODE: ` +
        verifyCode +
        `</strong></span><br>
		<span style="font-size:14px;color:#b2b2b2;line-height:40px">( Please keep a copy of this receipt for verifying your email.)</span>
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
		<strong>YOUR INFORMATION:</strong>
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
		<strong>Your name:</strong><br>` +
        req.body.name +
        `<br><br>
	<strong>Register Date:</strong><br>` +
        'December 29, 2019' +
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
	  <a href="" target="_blank">` +
        req.body.email +
        `</a><br><br>
	  <strong>Source:</strong><br>
	  Online Auction<br>
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
		  Need Help? <a style="text-decoration:none;color:#6bae7c" href="" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://help.epicgames.com&amp;source=gmail&amp;ust=1578399007123000&amp;usg=AFQjCNH6T8gYBGjXX1Sm6CCRZ3MVMV5a5A">online.auction.com</a><br>
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
	  <a href="https://www.epicgames.com/tos" style="color:#6bae7c" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.epicgames.com/tos&amp;source=gmail&amp;ust=1578399007123000&amp;usg=AFQjCNHn5wDnKOdRS7NcIUEdD7RMy7sKuw">Terms of Service</a> | <a href="https://www.epicgames.com/privacypolicy" style="color:#6bae7c" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.epicgames.com/privacypolicy&amp;source=gmail&amp;ust=1578399007123000&amp;usg=AFQjCNEo58m0iCO-aMGudkcb3PzNRIWWXg">Privacy Policy</a>
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
</tbody></table><div class="yj6qo"></div><div class="adL">

</div></div><div class="adL">

</div></div></div><div id=":n6" class="ii gt" style="display:none"><div id=":n7" class="a3s aXjCH undefined"></div></div><div class="hi"></div></div></div>`;


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
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
    let mailOptions = {
        from: '"Online Auction" <derekzohar@gmail.com>', // sender address
        //to: 'ngovietthangww@gmail.com', // list of receivers
        to: req.body.email,
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        res.render('otpMail', { title: 'otp' });
    });
});


//verify by mail when win bidding
router.post('/bidWin', (req, res) => {
    const output =
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
					  <a><img align="none" alt="Auction" border="0" hspace="0" src="https://ci4.googleusercontent.com/proxy/R460Rf388PuEUmHGjY2rfamGAVeL94VGwEHBNh6pAYN0RTdYKPUgborSzl7fx8Zi-JwAaDf7YRvo=s0-d-e1-ft#http://../public/images/logo-small.JPG" style="max-width:70px;height:auto;display:block;margin:0px" title="Epic Games" vspace="0" width="70px" class="CToWUd">
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
					Congratulation
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
						  <strong>Hi ` + req.body.name + `</strong>
		  </span>
		  <br>
		  Congratulation on winning the auction<br><br>
		  <span style="font-size:35px"><strong>` +
        "Name product win" +
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
		  <strong>PRODUCT INFORMATION:</strong>
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
		  <strong>Your product:</strong><br>thang<br><br>
		<strong>Bid Date:</strong><br>`

    +"December 29, 2019" +

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
		  <a>` +
    req.body.email +
        `</a><br><br>
		  <strong>Merchant:</strong><br>
		  `

    +
    "name merchant" + `
		  
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
    let transporter = nodemailer.createTransport({
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
    let mailOptions = {
        from: '"Online Auction" <derekzohar@gmail.com>', // sender address
        //to: 'ngovietthangww@gmail.com', // list of receivers
        to: req.body.email,
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
});

//verify by mail when kick bid
router.post('/bidKick', (req, res) => {
    const output =
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
					  <a><img align="none" alt="Auction" border="0" hspace="0" src="https://ci4.googleusercontent.com/proxy/R460Rf388PuEUmHGjY2rfamGAVeL94VGwEHBNh6pAYN0RTdYKPUgborSzl7fx8Zi-JwAaDf7YRvo=s0-d-e1-ft#http://../public/images/logo-small.JPG" style="max-width:70px;height:auto;display:block;margin:0px" title="Epic Games" vspace="0" width="70px" class="CToWUd">
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
					Sorry :< 
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
						  <strong>Hi ` + req.body.name + `</strong>
		  </span>
		  <br>
		  We're so sorry, you're kicked bid product<br><br>
		  <span style="font-size:35px"><strong>` +
        "Name product kicked" +
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
		  <strong>PRODUCT INFORMATION:</strong>
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
		  <strong>Your product:</strong><br>thang<br><br>
		<strong>Bid Date:</strong><br>`

    +"December 29, 2019" +

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
		  <a>` +
    req.body.email +
        `</a><br><br>
		  <strong>Merchant:</strong><br>
		  `

    +
    "name merchant" + `
		  
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
    let transporter = nodemailer.createTransport({
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
    let mailOptions = {
        from: '"Online Auction" <derekzohar@gmail.com>', // sender address
        //to: 'ngovietthangww@gmail.com', // list of receivers
        to: req.body.email,
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
});

//verify by mail when finish bid
router.post('/bidFinish', (req, res) => {
    const output =
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
					  <a><img align="none" alt="Auction" border="0" hspace="0" src="https://ci4.googleusercontent.com/proxy/R460Rf388PuEUmHGjY2rfamGAVeL94VGwEHBNh6pAYN0RTdYKPUgborSzl7fx8Zi-JwAaDf7YRvo=s0-d-e1-ft#http://../public/images/logo-small.JPG" style="max-width:70px;height:auto;display:block;margin:0px" title="Epic Games" vspace="0" width="70px" class="CToWUd">
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
					Bidding Verification  
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
						  <strong>Hi ` + req.body.name + `</strong>
		  </span>
		  <br>
		  Bidding product has finished<br><br>
		  <span style="font-size:35px"><strong>` +
        "Name product finished" +
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
		  <strong>PRODUCT INFORMATION:</strong>
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
		  <strong>Your product:</strong><br>thang<br><br>
		<strong>Bid Date:</strong><br>`

    +"December 29, 2019" +

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
		  <a>` +
    req.body.email +
        `</a><br><br>
		  <strong>Merchant:</strong><br>
		  `

    +
    "name merchant" + `
		  
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
    let transporter = nodemailer.createTransport({
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
    let mailOptions = {
        from: '"Online Auction" <derekzohar@gmail.com>', // sender address
        //to: 'ngovietthangww@gmail.com', // list of receivers
        to: req.body.email,
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
});


module.exports = router;