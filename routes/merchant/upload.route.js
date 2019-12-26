var express = require('express');
var router = express.Router();
var moment = require('moment');

const deviceModel = require('../../models/device.model');
const productModel = require('../../models/product.model');

router.get('/upload', async function(req, res) {
    var result = await deviceModel.all();
    var context = {
        items: result
    }
    res.render('merchant/uploadProduct', { title: 'Upload a product:', list: context });
});

router.post('/upload', async function(req, res) {
    console.log(req.body);
    const multer = require('multer');
    var fs = require('fs');

    var lastId = (await deviceModel.getLastId())[0].id + 1;
    var newId = lastId.toString(10);
    var dir = `./public/images/device/${newId}/`;
    var showDir = `images/device/${newId}/`;
    var pictureDir = [];

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const storage = multer.diskStorage({

        filename: function(req, file, cb) {
            if (!req.headers.index)
                req.headers.index = 0
            var filename = (req.headers.index++) + "." + file.originalname.split('.').pop();
            pictureDir.push(showDir + filename);
            cb(null, filename);
        },
        destination: function(req, file, cb) {
            cb(null, dir);
        },
    });

    const upload = multer({ storage });

    upload.array('images', 5)(req, res, async function(err) {
        if (err) {
            var result = await deviceModel.all();
            var context = {
                items: result
            }
            res.render('merchant/uploadProduct', { title: 'Upload a product:', list: context });
        } else {
            res.render('index');
        }

        var id = req.body.deviceid;
        var result = true;

        if (id === "-1" && pictureDir.length > 0) {
            //Init the params here
            var device = {
                "brand": req.body.brand,
                "model": req.body.model,
                "type": req.body.type,
                "released": req.body.released,
                "status": req.body.status,
                "weight": req.body.weight,
                "display_type": req.body.displaytype,
                "display_size": req.body.displaysize,
                "display_resolution": req.body.displayres,
                "os": req.body.os,
                "gpu": req.body.gpu,
                "ram": req.body.ram,
                "sensors": req.body.sensors,
                "battery": req.body.battery,
                "colors": req.body.color,
                "img_url": pictureDir[0],
                "img_url1": pictureDir[1],
                "img_url2": pictureDir[2],
            }
            result = await deviceModel.add(device);
        }

        if (!result) {
            return;
        }

        if (result && id === "-1") {
            id = (await deviceModel.getLastId())[0].id;
        }

        if (id !== "-1") {
            var date = Date.parse(req.body.expired);
            var nowDate = Date.now();

            var formattedExpiredDate = moment(date).format('YYYY-MM-DD hh:mm:ss');
            var formattedNowDate = moment(nowDate).format('YYYY-MM-DD hh:mm:ss');


            console.log("SESS" + req.session.authUser.id);
            var product = {
                "device_id": id,
                "seller_id": req.session.authUser.id,
                "first_price": req.body.startprice,
                "step_price": req.body.stepprice,
                "start_date": formattedNowDate,
                "end_date": formattedExpiredDate,
                "description": "0",
            }

            var addProductResult = await productModel.add(product);

            if (addProductResult) {
                console.log("added");
            } else {
                var result = await deviceModel.all();
                var context = {
                    items: result
                }
                res.render('merchant/uploadProduct', { title: 'Upload a product:', list: context });
            }
        }
    });
});
module.exports = router;