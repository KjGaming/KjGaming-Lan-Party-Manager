var express = require('express');
var router = express.Router();
var Server = require('../models/server');
var jwt = require('jsonwebtoken');

router.use('/', function (req, res, next) {

    jwt.verify(req.query.id_token || req.get('Authorization'), '20Kj!G!aming?Rock.17' || '20Kj!G!aming?Rock.Creator.17' || '20Kj!G!aming?Rock.Admin.17', function (err, decoded) {
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
    Server.find()
        .exec(function (err, server) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: server
            });
        });
});

router.post('/', function (req, res, next) {
    var server = new Server({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,

    });

    server.download.path = req.body.downloadPath;
    server.server.ip = req.body.serverIp;
    server.server.mode = req.body.serverMode;

    server.save(function (err, result) {
        if (err) {
            if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                return res.status(500).json({
                    title: 'Hier ist ein Fehler aufgetreten',
                    error: err
                });
            }
        }
        res.status(201).json({
            message: 'Server/Download created',
            obj: result
        });
    });
});


module.exports = router;
