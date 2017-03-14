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

router.put('/new', function (req, res, next) {
    console.log(req.body.name);
    console.log(req.body.lock);
    var side = new Sides({
        name: req.body.name,
        lock: req.body.lock
    });

    side.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfolgreich!',
            message: 'Neue Seite angelegt',
            obj: result
        });
    });
});

router.put('/lock', function (req, res, next) {
    Sides.findByIdAndUpdate(req.body.id, {$set: {lock: req.body.lock}},
        function (err, side) {
            if (err) {
                if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                    return res.status(500).json({
                        title: 'Hier ist ein Fehler aufgetreten',
                        error: err
                    });
                }
            }
            res.status(201).json({
                title: 'Erfolgreich!',
                message: 'Seite bearbeitet',
                obj: side
            });
        });
});


module.exports = router;
