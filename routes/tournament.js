var express = require('express');
var router = express.Router();
var Tournament = require('../models/tournament');
var jwt = require('jsonwebtoken');

router.use('/', function (req, res, next) {

    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.17' || '20Kj!G!aming?Rock.Creator.17' || '20Kj!G!aming?Rock.Admin.17', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }

        next();
    });
});

router.get('/', function (req, res, next) {
    Tournament.find()
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

router.post('/saveGame', function (req, res, next) {
    var eventTable = new Timetable({
        title: req.body.title,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        mode: req.body.mode,
        content: req.body.content

    });

    Tournament.save(function (err, result) {
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

router.post('/creat', function (req, res, next) {
    var tournament = new Tournament({
        name: req.body.name,
        gameName: req.body.gameName,
        mode: req.body.mode,
        size: req.body.size,
        playerMode: req.body.playerMode

    });

    tournament.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            message: 'Neues Tournament erstellt',
            obj: result
        });
    });
});

module.exports = router;
