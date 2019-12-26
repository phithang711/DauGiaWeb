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
    var dir = `./public/imgs/device/${newId}/`;
    var showDir = `imgs/device/${newId}/`;
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

        var result = false;

        if (pictureDir.length > 0) {
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

        if (result) {
            var id = req.body.deviceid;

            if (id === -1) {
                var id = (await deviceModel.getLastId())[0].id;
            }

            var date = Date.parse(req.body.expired);
            var nowDate = Date.now();

            var formattedExpiredDate = moment(date).format('YYYY-MM-DD hh:mm:ss');
            var formattedNowDate = moment(nowDate).format('YYYY-MM-DD hh:mm:ss');


            var product = {
                "device_id": 0,
                "seller_id": "1",
                "first_price": req.body.startprice,
                "step_price": req.body.stepprice,
                "start_date": formattedNowDate,
                "end_date": formattedExpiredDate,
                "description": "0",
            }

            var result = await productModel.add(product);
        } else {
            res.render('uploadProduct')
        }
    });
});
module.exports = router;