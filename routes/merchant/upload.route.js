var express = require('express');
var router = express.Router();

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
    const multer = require('multer');
    var fs = require('fs');

    var lastId = (await deviceModel.getLastId())[0].id + 1;
    var newId = lastId.toString(10);
    var dir = `./public/imgs/device/${newId}/`;
    var showDir = `imgs/device/${newId}/`;
    var pictureDir = [];

    console.log(dir);

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
            console.log(pictureDir);
            res.render('index');
        }

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
        console.log(device);
        var result = await deviceModel.add(device);

        if (result) {
            var id = req.body.deviceid;

            if (id === -1) {
                var id = (await deviceModel.getLastId())[0].id;
            }

            var product = {
                if () {

                }
            }

            var result = await productModel.add();
        }
        //     await add(product)
        // if(addproduct===true)
        //      res.render('the new product)
        // 

    });
});
module.exports = router;