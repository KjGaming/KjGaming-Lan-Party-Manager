let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let newsRoutes = require('./admin/news');
let serverRoutes = require('./admin/server');
let eventRoutes = require('./admin/event');
let productRoutes = require('./admin/product');
let userRoutes = require('./admin/user');
let sidesRoutes = require('./admin/sides');
let cateringRoutes = require('./admin/catering');

let secret = require('./secret/secret');


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
router.use('/sides', sidesRoutes);
router.use('/catering', cateringRoutes);


module.exports = router;
