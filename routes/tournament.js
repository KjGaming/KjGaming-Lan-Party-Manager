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

router.get('/selected', function (req, res, next) {
    var tournamentId = req.query.id;
    Tournament.findById(tournamentId, function (err, event) {
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

router.post('/creatGames', function (req, res, next) {
    var tournament = {
        gameId : req.body.gameId,
        team1: req.body.team1,
        team2: req.body.team2,
        result1: req.body.result1,
        result2: req.body.result2
    };

    Tournament.findByIdAndUpdate(req.body.id, { $push: { 'games': tournament }}, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            message: 'Neues Game erstellt',
            obj: result
        });
    });
});

module.exports = router;
