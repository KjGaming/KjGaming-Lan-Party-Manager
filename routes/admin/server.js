var express = require('express');
var router = express.Router();
var Server = require('../../models/server');

router.post('/', function (req, res, next) {
    if (req.body.ip) {
        server = new Server({
            title: req.body.title,
            content: req.body.content,
            status: false,
            server: {
                mode: req.body.mode,
                ip: req.body.ip
            }
        });
    } else {
        server = new Server({
            title: req.body.title,
            content: req.body.content,
            download: {
                path: req.body.path
            }
        });
    }


    server.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfoglreich',
            message: 'Download/Server erstellt',
            obj: result
        });
    });
});

router.put('/', function (req, res, next) {
    if (req.body.ip) {
        updateObject = {
            $set: {
                title: req.body.title,
                content: req.body.content,
                server: {
                    mode: req.body.mode,
                    ip: req.body.ip
                }
            }
        };
    } else {
        updateObject = {
            $set: {
                title: req.body.title,
                content: req.body.content,
                download: {
                    path: req.body.path
                }
            }
        };
    }


    Server.findByIdAndUpdate(req.body.id, updateObject, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfoglreich',
            message: 'Download/Server wurde geändert',
            obj: result
        });
    });
});

router.delete('/:id', function (req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({
            title: 'No news selected',
            error: err
        });
    }
    console.log(req.params.id);
    Server.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfolgreich',
            message: 'Download/Server wurde gelöscht',
            obj: result
        });
    });
});

router.put('/status', function (req, res, next) {
    var updateObject = {
        $set: {
            status: req.body.status
        }
    };


    Server.findByIdAndUpdate(req.body.id, updateObject, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfoglreich',
            message: 'Server Status wurde geändert',
            obj: result
        });
    });
});


module.exports = router;
