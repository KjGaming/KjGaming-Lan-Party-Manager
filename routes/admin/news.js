var express = require('express');
var router = express.Router();
var News = require('../../models/news');

router.get('/', function (req, res, next) {
    News.find()
        .exec(function (err, news) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: news
            });
        });
});

router.post('/add', function (req, res, next) {
    var news = new News({
        title: req.body.title,
        content: req.body.content,
        icon: {
            look: req.body.iconLook,
            color: req.body.iconColor
        }
    });

    news.save(function (err, result) {
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
            content: req.body.content,
            icon: {
                look: req.body.iconLook,
                color: req.body.iconColor
            }
        }
    };

    News.findByIdAndUpdate(req.body.id, updateObject, function (err, result) {
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
    News.findByIdAndRemove(req.body.id, function (err, result) {
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
