var express = require('express');
var router = express.Router();
var Event = require('../../models/timetable');

router.get('/', function (req, res, next) {
    Event.find()
        .exec(function (err, result) {
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

router.post('/add', function (req, res, next) {
    var event = new Event({
        title: req.body.title,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        mode: req.body.mode,
        content: req.body.content

    });

    event.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            message: 'News erstellt',
            obj: result
        });
    });
});

router.put('/edit', function (req, res, next) {
    var updateObject = {
        $set:{
            title: req.body.title,
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,
            mode: req.body.mode,
            content: req.body.content
        }
    };

    Event.findByIdAndUpdate(req.body.id, updateObject, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            message: 'News wurde geändert',
            obj: result
        });
    });
});

router.delete('/del', function (req, res, next) {
    Event.findByIdAndRemove(req.body.id, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            message: 'News wurde gelöscht',
            obj: result
        });
    });
});

module.exports = router;
