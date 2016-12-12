var express = require('express');
var router = express.Router();
var Timetable = require('../models/timetable');
var jwt = require('jsonwebtoken');

router.use('/', function (req, res, next) {
    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.17', function (err, decoded) {
        if (err) {
            jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Creator.17', function (err2, decoded2) {
                if (err2) {
                    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Admin.17', function (err3, decoded3) {
                        if (err3) {
                            res.status(401).json({
                                title: 'Not Authenticated'
                            });
                        }else{
                            next();
                        }

                    });

                }else{
                    next();
                }
            });
        }else{
            next();
        }
    });
});

router.get('/', function (req, res, next) {
    Timetable.find()
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

router.post('/', function (req, res, next) {
    var eventTable = new Timetable({
        title: req.body.title,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        mode: req.body.mode,
        content: req.body.content

    });

    eventTable.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            message: 'Neues Event erstellt',
            obj: result
        });
    });
});


module.exports = router;
