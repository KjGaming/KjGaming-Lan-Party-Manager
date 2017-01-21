var express = require('express');
var router = express.Router();
var News = require('../../models/news');

router.post('/', function (req, res, next) {
    var news = new News({
        title: req.body.title,
        content: req.body.content,
        icon: {
            look: req.body.iconLook,
            color: req.body.iconColor
        }
    });

    news.save(function (err, result) {
        if(err){
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        if(news == null){
            return res.status(500).json({
                title: 'Die erstellte News war leer',
                error: err
            });
        }
        res.status(201).json({
            title: 'News erstellt',
            message: 'Die News wurde erfoglreich erstellt',
            obj: result
        });
    });
});

router.put('/', function (req, res, next) {
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

router.delete('/:id', function (req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({
            title: 'No news selected',
            error: err
        });
    }
    console.log(req.params.id);
    News.findByIdAndRemove(req.params.id, function (err, result) {
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
