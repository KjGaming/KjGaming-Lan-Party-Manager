var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var newsRoutes = require('./admin/news');
var serverRoutes = require('./admin/server');
var eventRoutes = require('./admin/event');
var productRoutes = require('./admin/product');
var userRoutes = require('./admin/user');

var secret = require('./secret');


/** check if reg is admin **/
router.use('/', function (req, res, next) {
    jwt.verify(req.get('Authorization'), secret.adminSecret, function (err3, decoded3) {
        if (err3) {
            res.status(401).json({
                title: 'Not Authenticated'
            });
        } else {
            next();
        }
    });
});

/** routes that can only use admins **/
router.use('/news', newsRoutes);
router.use('/server', serverRoutes);
router.use('/event', eventRoutes);
router.use('/product', productRoutes);
router.use('/user', userRoutes);


module.exports = router;
