var express = require('express');
var router = express.Router();
var Catering = require('../models/catering');
var Products = require('../models/product');
var jwt = require('jsonwebtoken');

router.use('/', function (req, res, next) {

    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.17', function (err, decoded) {
        if (err) {
            jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Creator.17', function (err2, decoded2) {
                if (err2) {
                    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Admin.17', function (err3, decoded3) {
                        if (err3) {
                            return res.status(401).json({
                                title: 'Not Authenticated',
                                error: err
                            });
                        }

                    });

                }
            });
        }

        next();
    });
});

router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    var status = req.query.status;
    var productArray = [];
    Catering.find({user: decoded.user._id, status: status})
        .populate('products.id', 'name price info')
        .exec(function (err, catering) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            for (var k = 0; catering.length > k; k++) {
                for (var i = 0; catering[k].products.length > i; i++) {
                    var isInArray = false;
                    var product = catering[k].products[i].id;

                    if (!productArray) {
                        productArray.push({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            count: catering[k].products[i].count
                        });
                    }
                    for (var j = 0; productArray.length > j; j++) {
                        if (productArray[j].id == product._id) {
                            isInArray = true;
                            productArray[j].count = productArray[j].count + catering[k].products[i].count;
                            break;
                        }
                    }

                    if (!isInArray) {
                        productArray.push({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            count: catering[k].products[i].count
                        });
                    }


                }
            }


            res.status(200).json({
                message: 'Success',
                obj: productArray

            });

        });
});

router.get('/products', function (req, res, next) {
    Products.find().exec(function (err, products) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: products
        });
    });
});

router.post('/ordered', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    var userId = decoded.user._id;
    var catering = new Catering({
        ordered: req.body.ordered,
        status: "ordered",
        user: userId
    });
    for (var i = 0; req.body.products.length > i; i++) {
        catering.products.push({
            id: req.body.products[i].id,
            count: req.body.products[i].count
        });
    }


    if (req.body.delivered) {
        catering.delivered = req.body.delivered;
    }

    catering.save(function (err, result) {
        if (err) {
            if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                return res.status(500).json({
                    title: 'Hier ist ein Fehler aufgetreten',
                    error: err
                });
            }
        }
        res.status(201).json({
            message: 'Ordered created',
            obj: result
        });
    });

});

router.get('/deleteOrdered', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    var userId = decoded.user._id;
    Catering.find({user: decoded.user._id, status: 'ordered'})
        .remove()
        .exec(function (err, result) {
            if (err) {
                if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                    return res.status(500).json({
                        title: 'Hier ist ein Fehler aufgetreten',
                        error: err
                    });
                }
            }
            res.status(201).json({
                message: 'Ordered delete',
                obj: result
            });
        });

});

// For the admin Routes, only to test the user catering
router.post('/products', function (req, res, next) {
    var product = new Products({
        name: req.body.name,
        price: req.body.price

    });

    if (req.body.info) {
        product.info = req.body.info;
    }

    product.save(function (err, result) {
        if (err) {
            if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                return res.status(500).json({
                    title: 'Hier ist ein Fehler aufgetreten',
                    error: err
                });
            }
        }
        res.status(201).json({
            message: 'Porduct created',
            obj: result
        });
    });

});

module.exports = router;
