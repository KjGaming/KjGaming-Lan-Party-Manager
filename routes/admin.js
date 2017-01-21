var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var newsRoutes = require('./admin/news');
var downloadRoutes = require('./admin/download');
var serverRoutes = require('./admin/server');
var eventRoutes = require('./admin/event');


/** check if user is admin **/
router.use('/', function (req, res, next) {
    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Admin.17', function (err3, decoded3) {
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
router.use('/download', downloadRoutes);
router.use('/server', serverRoutes);
router.use('/event', eventRoutes);


module.exports = router;
