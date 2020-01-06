var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const config = require('../configs/userModelConfig.json');
const toMerchant = require('../models/tomerchant');

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
    res.locals.lcIsAuthenticated = false;
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

    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;

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

router.post('/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: Thang</li>
        <li>Company: Thang</li>
        <li>Email: Thang</li>
        <li>Phone: Thang</li>
      </ul>
      <h3>Message</h3>
      <p>Thang</p>
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
        from: '"Nodemailer Contact" <derekzohar@gmail.com>', // sender address
        to: 'tranthuanthanh535@outlook.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(123);
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('otpMail', { title: 'otp' });
    });
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
})

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

module.exports = router;