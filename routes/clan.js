var express = require('express');
var router = express.Router();
var Clan = require('../models/clan');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

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
    Clan.find()
        .populate('user', 'nickName firstName lastName')
        .populate('admin', 'nickName')
        .exec(function (err, clan) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: clan
            });
        });
});

router.post('/creat', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        var clan = new Clan({
            name: req.body.name,
            shortName: req.body.shortName,
            password: bcrypt.hashSync(req.body.password, 10),
            admin: user

        });
        clan.user.push(user);

        clan.save(function (err, result) {
            if (err) {
                if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                    return res.status(500).json({
                        title: 'Hier ist ein Fehler aufgetreten',
                        error: err
                    });
                }
            }
            user.clan.push(result);
            user.save();
            res.status(201).json({
                message: 'Server/Download created',
                obj: result
            });
        });
    });

});

/*router.post('/editClan', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        Clan.findById(req.body.clanId, function (err, dbClan) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            var clan = new Clan();
            if (req.body.password) {
                clan.password = bcrypt.hashSync(req.body.password, 10);
            } else {
                clan.password = dbClan.password;
            }
            if (req.body.name) {
                clan.name = req.body.name;
            } else {
                clan.name = dbClan.name;
            }
            if (req.body.shortName) {
                clan.shortName = req.body.shortName;
            } else {
                clan.shortName = dbClan.shortName;
            }
            var user = [];
            var userAdd;
            var userAdmin = false;

            for(var bodyUser in req.body.user){
                userAdd = true;

                if (req.body.admin && (req.body.admin == bodyUser.id)) {
                    clan.admin = req.body.admin;
                    userAdmin = true;
                }

                for(var dbUser in dbClan.user){
                    if(dbUser._id == bodyUser.id){
                        user.push(bodyUser.id);
                        userAdd = false;
                        break;
                    }
                }
                if(userAdd == true){
                    user.push(bodyUser.id);
                }
            }

            if(!userAdmin){
                clan.admin = dbClan.admin;
            }

            clan.save(function (err, result) {
                if (err) {
                    if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                        return res.status(500).json({
                            title: 'Hier ist ein Fehler aufgetreten',
                            error: err
                        });
                    }
                }
                for(var bodyUser in req.body.user){
                    User.findById(bodyUser.id, function (err, user) {
                        user.clan.push(result);
                        user.save();
                    });
                }


                res.status(201).json({
                    message: 'Server/Download created',
                    obj: result
                });
            });

        });

    });

});

router.post('/delete', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        Clan.findById(req.body.clanId)
            .remove()
            .exec(function (err, clan) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                for(var userDB in clan.user){
                    User.findById(userDB.id, function (err, user) {
                        user.clan.pull();
                        user.save();
                    });
                }

                res.status(200).json({
                    message: 'Success',
                    obj: clan
                });
            });

    });

});*/


module.exports = router;
