var express = require('express');
var router = express.Router();
var News = require('../../models/news');

router.get('/', function (req, res, next) {
    News.find()
        .exec(function (err, news) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: news
            });
        });
});

module.exports = router;
