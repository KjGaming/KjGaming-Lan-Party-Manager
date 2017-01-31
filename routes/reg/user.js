var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../../models/user');
var Clan = require('../../models/clan');


/** Get alle Users with minmal Information **/
router.get('/', function (req, res, next) {
    var userArray = [];
    User.find()
        .populate('clan', 'shortName name')
        .exec(function (err, user) {
            console.log(user);
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            for (var i = 0; user.length > i; i++) {
                userArray[i] = {
                    firstName: user[i].firstName,
                    nickName: user[i].nickName,
                    seat: user[i].seat,
                    role: user[i].role,
                    clan: user[i].clan,
                    games: user[i].games
                }
            }

            res.status(200).json({
                message: 'Success',
                obj: userArray
            });
        });
});

/** change userdata, only the owner can change his data  **/
router.put('/', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if(req.body.address){
            if(req.body.address.street){
                user.address.street = req.body.address.street;
            }
            if(req.body.address.nr){
                user.address.nr = req.body.address.nr;
            }
            if(req.body.address.postalCode){
                user.address.postalCode = req.body.address.postalCode;
            }
            if(req.body.address.city){
                user.address.city = req.body.address.city;
            }
        }

        if(req.body.birth){
            user.birth = req.body.birth;
        }
        if(req.body.password){
            user.birth = req.body.password;
        }
        if(req.body.vegi){
            user.birth = req.body.vegi;
        }

        user.save(function (err, updatedUser) {
            if (err){
                return res.status(500).json({
                    title: 'Ein Fehler ist aufgetreten',
                    error: err
                });
            }
            res.status(201).json({
                message: 'User bearbeitet',
                obj: updatedUser
            });
        });

    });

});

/** User Seat Information **/
/** reg get seat information **/
router.get('/seat', function (req, res, next) {
    var userArray = [];
    User.find()
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            for (var i = 0; user.length > i; i++) {
                userArray[i] = {
                    id: user[i]._id,
                    nickName: user[i].nickName,
                    seat: user[i].seat
                }
            }

            res.status(200).json({
                message: 'Success',
                obj: userArray
            });
        });
});

/** save seat for the reg **/
router.post('/seat', function (req, res, next) {
    User.findOne({'seat': req.body.seat}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'Fehler',
                error: {message: 'Die Platzreservierung hat nicht funktioniert'}
            });
        }
        if (!user || req.body.seat === null) {
            User.findOneAndUpdate({_id: req.body.id}, {'$set': {'seat': req.body.seat}}, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Die Platzreservierung hat nicht funktioniert'}
                    });
                }
                if (req.body.seat == null) {
                    res.status(200).json({
                        title:'Erfolgreich:',
                        message: 'Platz wurde freigegeben'
                    });
                } else {
                    res.status(200).json({
                        title:'Erfolgreich:',
                        message: 'Platz ' + req.body.seat + ' wurde für dich reserviert'
                    });
                }

            });

        } else {
            return res.status(500).json({
                title: 'Fehler',
                error: {message: 'Dieser Platz ist schon vergeben'}
            });
        }
    });

});

module.exports = router;
