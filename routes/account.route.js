var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../models/user.model");
const config = require("../configs/userModelConfig.json");

router.get("/login", function(req, res, next) {
  res.render("login", { title: "AuctionDealer Login", layout: false });
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
  res.redirect("/");
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
  res.redirect(url);
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
    isBuyer: isBuyer,
    isMerchant: isMerchant,
    isAdmin: isAdmin
  });
});

router.post("/profile/changeProfile",async function(req, res) {
  let user = req.session.authUser;
  
  const email = req.body.email;
  const  phone = req.body.phone;
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
    isBuyer: isBuyer,
    isMerchant: isMerchant,
    isAdmin: isAdmin
  });
});

module.exports = router;
