var express = require('express');
var router = express.Router();
var Event = require('../../models/event');

router.get('/', function (req, res, next) {
    Event.find()
        .exec(function (err, event) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: event
            });
        });
});

module.exports = router;
