var express = require('express');
var router = express.Router();
var Event = require('../../models/event');


router.post('/', function (req, res, next) {
    var diffDate = Math.abs(req.body.timeEnd - req.body.timeStart);
    var event = new Event({
        title: req.body.title,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        timeDuration: diffDate,
        mode: req.body.mode,
        content: req.body.content

    });

    event.save(function (err, result) {
        if(err){
            return res.status(500).json({
                title: 'Fehler',
                error: {message: 'Hier ist ein Fehler aufgetreten'}
            });
        }
        if(event == null){
            return res.status(500).json({
                title: 'Fehler',
                error: {message: 'Das erstellte Event war leer'}
            });
        }
        res.status(201).json({
            title: 'Erfolgreich',
            message: 'Das Event wurde erfoglreich erstellt',
            obj: result
        });
    });
});

router.delete('/:id', function (req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({
            title: 'Fehler',
            error: {message: 'Kein Event ausgewählt'}

        });
    }
    Event.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Fehler',
                message: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfolgreich',
            message: 'Das Event wurde erfolgreich gelöscht',
            obj: result
        });
    });
});

module.exports = router;
