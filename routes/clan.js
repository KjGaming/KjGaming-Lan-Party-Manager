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

router.post('/edit', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    Clan.findById(req.body.clanId, function (err, dbClan) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }


        if (decoded.user._id != dbClan.admin) {
            return res.status(403).json({
                title: 'Du bis kein Admin!',
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

        Clan.findByIdAndUpdate(req.body.clanId,
            {
                $set: {
                    name: clan.name,
                    password: clan.password,
                    shortName: clan.shortName
                }
            },
            {new: true},
            function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'Hier ist ein Fehler aufgetreten',
                        error: err
                    });
                }

                res.status(201).json({
                    message: 'Clan gespeichert',
                    obj: result
                });
            });
    });
});

router.post('/out', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    Clan.findById(req.body.clanId, function (err, dbClan) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        for (var key in dbClan.user) {
            if (dbClan.user[key] == decoded.user._id) {
                dbClan.user.pull(decoded.user._id);
                User.findById(decoded.user._id, function (err, dbUser) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    dbUser.clan.pull(req.body.clanId);
                    dbClan.save(function (err, clanResult) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }
                        dbUser.save(function (err, userResult) {
                            if (err) {
                                return res.status(500).json({
                                    title: 'An error occurred',
                                    error: err
                                });
                            }
                            return res.status(201).json({
                                message: 'ausgetreten',
                                objUser: userResult,
                                objClan: clanResult
                            });
                        });
                    });

                });
            }
        }
    });
});

router.post('/in', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    var password = req.body.password;
    var userIsIn = false;

    Clan.findById(req.body.clanId, function (err, dbClan) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        for (var key in dbClan.user) {
            if (dbClan.user[key] == decoded.user._id) {
                userIsIn = true;
                break;
            }
        }

        if (userIsIn) {
            return res.status(403).json({
                title: 'Fehler!',
                error: {message: 'Du bist schon Mitglied in diesem Clan'}
            });
        }

        if (!bcrypt.compareSync(password, dbClan.password)) {
            return res.status(403).json({
                title: 'Fehler!',
                error: {message: 'Das Passwort war nicht richtig!'}
            });
        }

        dbClan.user.push({_id: decoded.user._id});
        User.findById(decoded.user._id, function (err, dbUser) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            dbUser.clan.push({_id: req.body.clanId});
            dbClan.save(function (err, clanResult) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                dbUser.save(function (err, userResult) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    return res.status(201).json({
                        title: 'Erfolg!',
                        message: 'Sie sind erfolgreich diesem Clan beigetreten.',
                        objUser: userResult,
                        objClan: clanResult
                    });
                });
            });

        });


    });

});

router.post('/del', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    var bulkArray;
    Clan.findById(req.body.clanId, function (err, clan) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (clan.admin != decoded.user._id) {
            return res.status(500).json({
                title: 'Fehler!',
                error: {massage: 'Sie sind kein Admin!'}
            });
        }
        for (var i = 0; clan.user.length > i ; i++) {
            User.findByIdAndUpdate(clan.user[i], {$pull: {clan: req.body.clanId}},
                function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            title: 'User finde error',
                            error: err
                        });
                    }
                });
        }
        clan.remove(req.body.clanId, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'Remove Fehler',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Erfolgreich gelöscht',
                obj: clan
            });
        });


    });

});


module.exports = router;
