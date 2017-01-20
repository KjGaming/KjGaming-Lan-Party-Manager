var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var News = require('../models/news');

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

router.use('/', function (req, res, next) {
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
});

/** Create a new news **/
router.post('/', function (req, res) {
    var news = new News({
        title: req.body.title,
        content: req.body.content,
        icon:{
            look: req.body.look,
            color: req.body.color
        }
    });


    news.save(function (err, news) {
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
        return res.status(201).json({
            title: 'News erstellt',
            error: news
        });
    });
});

/** Update a news **/
router.put('/', function (res, req) {

});

/** Delete a news **/
router.delete('/', function (res, req) {

});

module.exports = router;
