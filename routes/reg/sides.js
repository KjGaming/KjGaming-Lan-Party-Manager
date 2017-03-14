var express = require('express');
var router = express.Router();
var Sides = require('../../models/sides');

router.get('/', function (req, res, next) {
    Sides.find().exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: result
        });
    });
});

module.exports = router;
