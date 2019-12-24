var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const config = require('../configs/userModelConfig.json');

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'AuctionDealer Login', layout: false });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'AuctionDealer Sign up', layout: false });
});



router.post('/signup', async function (req,res) {
    var email = req.body.email;
    var password = req.body.password;
    const user = await userModel.checkUsernameIsExisted(email);
    if(user !== null) {
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
    }
    const ret = await userModel.add(entity);
    res.redirect('/login');
});

router.post('/logout', async function (req, res) {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
});

const local = require('../middlewares/local.mdw');

router.post('/login', async function (req, res) 
{
    var email = req.body.email;
    var password = req.body.pass;
    const user = await userModel.checkUsernameIsExisted(email);
    if(user === null) {
        return res.render('login', {
            layout: false,
            err_message: 'Invalid username or password.'
        });
    }
    const rs = bcrypt.compareSync(password, user.password);
    if(rs === false) {
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

module.exports = router;