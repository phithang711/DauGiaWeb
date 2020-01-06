var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const config = require('../configs/userModelConfig.json');
const nodemailer = require('nodemailer');
router.get('/login', function(req, res, next) {
	res.render('login', { title: 'AuctionDealer Login', layout: false });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'AuctionDealer Sign up', layout: false });
});

router.post('/signup', async function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	const user = await userModel.checkUsernameIsExisted(email);
	if (user !== null) {
		return res.render('signup', {
			layout: false,
			err_message: 'Username is existed.'
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
	res.redirect('/login');
});

router.post('/logout', async function(req, res) {
	req.session.isAuthenticated = false;
	req.session.authUser = null;
	res.redirect(req.get('referer'));
});

const local = require('../middlewares/local.mdw');

router.post('/login', async function(req, res) {
	var email = req.body.email;
	var password = req.body.pass;
	const user = await userModel.checkUsernameIsExisted(email);
	if (user === null) {
		return res.render('login', {
			layout: false,
			err_message: 'Invalid username or password.'
		});
	}
	const rs = bcrypt.compareSync(password, user.password);
	if (rs === false) {
		return res.render('login', {
			layout: false,
			err_message: 'Invalid username or password.'
		});
	}

	delete user.password;
	req.session.isAuthenticated = true;
	req.session.authUser = user;
	const url = req.query.retUrl || '/';
	res.redirect(url);
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
	
	if(otp === verifyCode)
	{
		//home page
		console.log("home page");
	}
	else{
		//reload otpMail page
	}
	// console.log(otp);
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
								<a><img align="none" alt="Epic Games" border="0" hspace="0" src="../public/images/logo-small.JPG" style="max-width:70px;height:auto;display:block;margin:0px" title="Epic Games" vspace="0" width="70px" class="CToWUd">
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
		from: '"Nodemailer Contact" <derekzohar@gmail.com>', // sender address
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

		res.render('otpMail', { title: 'otp' });	
	});
});

module.exports = router;
