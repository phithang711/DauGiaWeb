var express = require('express');
var router = express.Router();

let slideShowItems = [{
        name: "N Logitech G230",
        picture: "https://i.ebayimg.com/thumbs/images/g/ZJ0AAOSwx2dYCQBz/s-l225.webp",
        description: "Stereo Gaming Noise-cancelling Wired Headset (981-000541)",
        price: "22.89"
    },
    {
        name: "Sony MDR-ZX110",
        picture: "https://i.ebayimg.com/thumbs/images/m/mlnBS6Y1o8ZiNBdYlKzllhA/s-l225.jpg",
        description: "Stereo Over-Head Headphone Extra Bass Black & White Colors",
        price: "99"
    },
    {
        name: "Shockproof Cover",
        picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
        description: "For Apple iPhone 11, 11 Pro, 11 Pro Max Case Ringke [FUSION-X]",
        price: "7.99"
    }
]

let homepageItems = [{
        content: {
            title: "Top",
            items: [{
                    name: "A4 USB LED",
                    picture: "https://i.ebayimg.com/thumbs/images/g/qigAAOSwWAldTTSW/s-l225.webp",
                    description: "Stereo Bass Surround Gaming Headset for PS4",
                    price: "14.97",
                    link: "/vatpham1"
                },
                {
                    name: "ONIKUMA K1",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "Stereo Bass Surround Gaming Headset for PS4 New Xbox One PC with Mic",
                    price: "19.98",
                    link: "/vatpham1"
                },
                {
                    name: "3 Colors LED Backlit",
                    picture: "https://i.ebayimg.com/thumbs/images/g/ocQAAOSwIRhd4OM5/s-l225.webp",
                    description: "USB Wired Gaming Keyboard Multimedia and 2400 DPI Mouse Set",
                    price: "16.14",
                    link: "/vatpham1"
                },
                {
                    name: "Logitech G203",
                    picture: "https://i.ebayimg.com/thumbs/images/m/mZE5JW39zkUOOj1wNlAQwQg/s-l225.jpg",
                    description: "Logitech G203 Mouse Prodigy Programmable",
                    price: "21.95",
                    link: "/vatpham1"
                },
                {
                    name: "McAfee AntiVirus 1 PC ",
                    picture: "https://i.ebayimg.com/thumbs/images/g/kJIAAOSwWnBctiB1/s-l225.webp",
                    description: "Digital delivery",
                    price: "15.99",
                    link: "/vatpham1"
                },
                {
                    name: "3 Colors LED Backlit",
                    picture: "https://i.ebayimg.com/thumbs/images/g/ocQAAOSwIRhd4OM5/s-l225.webp",
                    description: "USB Wired Gaming Keyboard Multimedia and 2400 DPI Mouse Set",
                    price: "16.14",
                    link: "/vatpham1"
                },
                {
                    name: "Logitech G203",
                    picture: "https://i.ebayimg.com/thumbs/images/m/mZE5JW39zkUOOj1wNlAQwQg/s-l225.jpg",
                    description: "Logitech G203 Mouse Prodigy Programmable",
                    price: "21.95",
                    link: "/vatpham1"
                },
                {
                    name: "McAfee AntiVirus 1 PC ",
                    picture: "https://i.ebayimg.com/thumbs/images/g/kJIAAOSwWnBctiB1/s-l225.webp",
                    description: "Digital delivery",
                    price: "15.99",
                    link: "/vatpham1"
                }
            ]
        }
    },
    {
        content: {
            title: "Trending",
            items: [{
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99",
                    link: "/vatpham1"
                },
                {
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99",
                    link: "/vatpham1"
                },
                {
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99",
                    link: "/vatpham1"
                },
                {
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99",
                    link: "/vatpham1"
                },
                {
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99",
                    link: "/vatpham1"
                },
                {
                    name: "3 Colors LED Backlit",
                    picture: "https://i.ebayimg.com/thumbs/images/g/ocQAAOSwIRhd4OM5/s-l225.webp",
                    description: "USB Wired Gaming Keyboard Multimedia and 2400 DPI Mouse Set",
                    price: "16.14",
                    link: "/vatpham1"
                },
                {
                    name: "Logitech G203",
                    picture: "https://i.ebayimg.com/thumbs/images/m/mZE5JW39zkUOOj1wNlAQwQg/s-l225.jpg",
                    description: "Logitech G203 Mouse Prodigy Programmable",
                    price: "21.95",
                    link: "/vatpham1"
                },
                {
                    name: "McAfee AntiVirus 1 PC ",
                    picture: "https://i.ebayimg.com/thumbs/images/g/kJIAAOSwWnBctiB1/s-l225.webp",
                    description: "Digital delivery",
                    price: "15.99",
                    link: "/vatpham1"
                }
            ]
        }
    },
    {
        content: {
            title: "Ending today",
            items: [{
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99"
                },
                {
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99"
                },
                {
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99"
                },
                {
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99"
                },
                {
                    name: "Lords of the Rings",
                    picture: "https://images-na.ssl-images-amazon.com/images/I/91OME-jyFmL.jpg",
                    description: "No",
                    price: "99"
                }
            ]
        }
    }
]

let accountList = [{
    id: "1",
    name: "abc"
},
{
    id: "2",
    name: "bcd"
}]

router.get('/', function(req, res) {
    var context = {
        data: homepageItems,
        slideshow: homepageItems
    };
    res.render('index', context);
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});

router.get('/manage', function(req, res, next) {
    res.render('manageView',accountList);
});


router.get('/vatpham1', function(req, res, next) {
    res.render('../views/user_page/UIitem', { title: 'Express' });
  });


module.exports = router;