var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');


// register User
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

// login User
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
                clan: user.clan

            });
        });
});

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
