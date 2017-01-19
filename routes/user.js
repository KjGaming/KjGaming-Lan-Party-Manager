var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Clan = require('../models/clan');


/** Register route **/
router.post('/', function (req, res, next) {
    var user = new User({
        nickName: req.body.nickName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        birth: req.body.birth,
        email: req.body.email,
        role: req.body.role,
        lock: req.body.lock,
        agb: req.body.agb,
        clan: []

    });

    user.address.street = req.body.street;
    user.address.nr = req.body.nr;
    user.address.postalCode = req.body.postalCode;
    user.address.city = req.body.city;
    user.lan.packet.id = req.body.packetId;
    user.lan.food = req.body.lanFood;
    user.lan.vegi = req.body.lanVegi;
    user.lan.packet.paid = req.body.packetPaid;
    user.lan.packet.price = req.body.packetPrice;

    user.save(function (err, result) {
        if (err) {
            if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                return res.status(500).json({
                    title: 'Nickname und E-Mail',
                    error: {message: 'Der Nickname und die E-Mail sind schon vergeben'}
                });
            }
            if (typeof err.errors.nickName != 'undefined') {
                return res.status(500).json({
                    title: 'Nickname',
                    error: {message: 'Dieser Nickname ist schon vergeben'}
                });
            }
            if (typeof err.errors.email != 'undefined') {
                return res.status(500).json({
                    title: 'E-Mail',
                    error: {message: 'Diese E-Mail ist schon vergeben'}
                });
            }

            return res.status(500).json({
                title: 'Anmeldung fehlgeschlagen !!!!!',
                error: {message: 'Passwort oder E-Mail ist Falsch'}
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

/** Login route **/
router.post('/signin', function (req, res, next) {
    User.findOne({email: req.body.email})
        .populate('clan', '_id name')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!user) {
                return res.status(401).json({
                    title: 'Login fehlgeschlagen',
                    error: {message: 'Passwort oder E-Mail ist Falsch'}
                });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    title: 'Login fehlgeschlagen',
                    error: {message: 'Passwort oder E-Mail ist Falsch'}
                });
            }
            var token;
            var adminToken;
            if (user.role == 2) {
                token = jwt.sign({user: user}, '20Kj!G!aming?Rock.Admin.17', {expiresIn: 7200});
                adminToken = 481;
            } else if (user.role == 1) {
                token = jwt.sign({user: user}, '20Kj!G!aming?Rock.Creator.17', {expiresIn: 7200});
                adminToken = 153;
            } else {
                token = jwt.sign({user: user}, '20Kj!G!aming?Rock.17', {expiresIn: 7200});
                adminToken = 0;
            }

            res.status(200).json({
                message: 'Successfully logged in',
                id_token: token,
                blackWidow: adminToken,
                userId: user._id,
                nickName: user.nickName,
                clan: user.clan

            });
        });
});

/** Authorization Route **/
router.use('/', function (req, res, next) {
    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.17', function (err, decoded) {
        if (err) {
            jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Creator.17', function (err2, decoded2) {
                if (err2) {
                    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Admin.17', function (err3, decoded3) {
                        if (err3) {
                            res.status(401).json({
                                title: 'Not Authenticated'
                            });
                        } else {
                            next();
                        }

                    });

                } else {
                    next();
                }
            });
        } else {
            next();
        }
    });
});

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
                    clan: user[i].clan
                }
            }

            res.status(200).json({
                message: 'Success',
                obj: userArray
            });
        });
});

/** Get alle Users with all Information **/
router.get('/all', function (req, res, next) {
    var userArray = [];
    User.find()
        .populate('clan', 'shortName name')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: user
            });
        });
});

/** change user data **/
router.post('/changeUser', function (req, res, next) {
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

/** admin only **/
/** change user data admin function **/
router.put('/changeAdmin', function (req, res, next) {
    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Admin.17', function (err3, decoded3) {
        if (err3) {
            res.status(401).json({
                title: 'Not Authenticated'
            });
        }
        User.findById(req.body._id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log(req.body);

            if(req.body.packetPaid != null){
                user.lan.packet.paid = req.body.packetPaid;
            }
            if(req.body.food != null){
                user.lan.food = req.body.food;
            }
            if(req.body.paid != null){
                user.lan.paid = req.body.paid;
            }
            if(req.body.role != null) {
                user.role = req.body.role;
            }
            if(req.body.lock != null){
                user.lock = req.body.lock;
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

});

/** admin only **/
/** delete a user **/
router.post('/del', function (req, res, next) {

    User.findById(req.body.userId, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if(user == null){
            return res.status(500).json({
                title: 'Spieler existiert nicht mehr',
                error: err
            });
        }


        if (user.clan != 0) {
            for (var i = 0; user.clan.length > i; i++) {
                Clan.findById(user.clan[i], function (err, clan) {

                    if (clan.user.length != 1) {

                        console.log(clan.user.length + ' != 1');

                        if (clan.admin == req.body.userId) {
                            console.log('admin');
                            /** change admin to next user **/
                            Clan.findByIdAndUpdate(clan._id, {
                                    $pull: {user: req.body.userId},
                                    $set: {admin: clan.user[0]}
                                },
                                function (err, clan) {

                                    if (err) {
                                        return res.status(500).json({
                                            title: 'User finde error',
                                            error: err
                                        });
                                    }
                                });
                        } else {
                            /!** drop user from clan **!/
                            console.log('no admin');
                            Clan.findByIdAndUpdate(clan._id, {$pull: {user: req.body.userId}},
                                function (err, clan) {

                                    if (err) {
                                        return res.status(500).json({
                                            title: 'User finde error',
                                            error: err
                                        });
                                    }
                                });
                        }

                    } else {
                        /** delete clan **/
                        console.log(clan.user.length + ' == 1');
                        clan.remove(function (err, clan) {
                            if (err) {
                                return res.status(500).json({
                                    title: 'User finde error',
                                    error: err
                                });
                            }
                        });
                    }
                });
            }
        }

        user.remove(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'Remove Fehler',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Erfolgreich gelöscht',
                obj: user
            });
        });


    });


});


/** User Seat Information **/
/** user get seat information **/
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

/** save seat for the user **/
router.post('/seat', function (req, res, next) {
    User.findOne({'seat': req.body.seat}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'Die Platzreservierung hat nicht funktioniert',
                error: err
            });
        }
        if (!user || req.body.seat === null) {
            User.findOneAndUpdate({_id: req.body.id}, {'$set': {'seat': req.body.seat}}, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        title: 'Die Platzreservierung hat nicht funktioniert',
                        error: err
                    });
                }
                if (req.body.seat == null) {
                    res.status(200).json({
                        message: 'Platz wurde freigegeben'
                    });
                } else {
                    res.status(200).json({
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
