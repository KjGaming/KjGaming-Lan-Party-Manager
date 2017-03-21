var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');

var User = require('../models/user');

var userRoutes = require('./reg/user');
var newsRoutes = require('./reg/news');
var sendMailRoutes = require('./reg/sendMail');
var serverRoutes = require('./reg/server');
var clanRoutes = require('./reg/clan');
var timetableRoutes = require('./reg/event');
var cateringRoutes = require('./reg/catering');
var tournamentRoutes = require('./reg/tournament');
var sidesRoutes = require('./reg/sides');


var secret = require('./secret/secret');
var emails = require('./secret/Emails');

/** Register route **/
router.put('/registration', function (req, res, next) {
    console.log(req.body);
    var user = new User({
        nickName: req.body.nickName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        birth: req.body.birth,
        email: req.body.email,
        role: req.body.role,
        lock: false,
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


    var userEmail = emails.userEmail();
    var adminEmail = emails.adminEmail(user.nickName, user.birth, user.email);

    user.save(function (err, result) {
        if (!result) {
            return res.status(500).json({
                title: 'Anmeldung fehlgeschlagen !!!!!',
                error: {message: 'Daten waren nicht korrekt'}
            });
        }
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


        //Send Mail

        var kjgSmtpConfig = {
            service: '1und1',
            auth: {
                user: 'presse@kjgaming.de',
                pass: secret.passwordEmail
            }
        };
        var transporter = nodemailer.createTransport(kjgSmtpConfig);

        var kjgMailOptions = {
            from: 'KjGaming <presse@kjgaming.de>', // sender address
            to: 'presse@kjgaming.de', // list of receivers
            subject: 'Anmeldung ' + user.nickName, // Subject line
            html: adminEmail, // plaintext body
        };

        var userMailOptions = {
            from: 'KjGaming <presse@kjgaming.de>', // sender address
            to: user.email, // list of receivers
            subject: 'Anmeldung ' + user.nickName, // Subject line
            html: userEmail, // plaintext body
        };

        // send mail with defined transport object
        transporter.sendMail(kjgMailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log('Message sent: ' + info.response);
            transporter.sendMail(userMailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                console.log('Message sent: ' + info.response);
            });
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
            if (user.lock != true) {
                return res.status(401).json({
                    title: 'Login fehlgeschlagen',
                    error: {message: 'Noch nicht freigeschalten!'}
                });
            }
            var token;
            var adminToken;
            if (user.role == 2) {
                token = jwt.sign({user: user}, secret.adminSecret, {expiresIn: 7200});
                adminToken = secret.adminTokenSecret;
            } else if (user.role == 1) {
                token = jwt.sign({user: user}, secret.orgaSecret, {expiresIn: 7200});
                adminToken = secret.orgaTokenSecret;
            } else {
                token = jwt.sign({user: user}, secret.userSecret, {expiresIn: 7200});
                adminToken = secret.userTokenSecret;
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

/** forgotPassword **/
router.post('/forgotPassword', function (req, res, next) {
    var token;
    User.findOne({email: req.body.email})
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'Fehler!',
                    error: err
                });
            }

            if (!user) {
                return res.status(500).json({
                    title: 'Fehler!',
                    error: {message: 'Diese E-Mail existiert nicht!'}
                });
            }
            var pin = parseInt(Math.random() * (9999 - 1000) + 1000);

            token = jwt.sign({email: user.email}, secret.passwordSecret + pin, {expiresIn: 600});
            console.log(token);

            /*var link = 'http://lan.kjgaming.de/#/passwortForgot?token=' + token;*/
            var link = 'http://localhost:8080/#/passwortForgot?token=' + token;

            //Send Mail

            var kjgSmtpConfig = {
                service: '1und1',
                auth: {
                    user: 'presse@kjgaming.de',
                    pass: secret.passwordEmail
                }
            };
            var transporter = nodemailer.createTransport(kjgSmtpConfig);

            var userMailOptions = {
                from: 'KjGaming <presse@kjgaming.de>', // sender address
                to: user.email, // list of receivers
                subject: 'KjGaming Passwort vergessen', // Subject line
                html: emails.resetEmail(pin, link) // plaintext body
            };


            transporter.sendMail(userMailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                console.log('Message sent: ' + info.response);

                res.status(200).json({
                    title: 'Erfolg!',
                    message: 'Dir wurde eine E-Mail zugeschickt'
                });
            });

        });
});

/** set new Password **/
router.post('/setNewPassword', function (req, res, next) {
    jwt.verify(req.body.token, secret.passwordSecret + req.body.pin, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Fehler',
                error: {message: 'Dein Pin oder dein Token ist nicht richtig/abgelaufen!'}
            });
        }

        User.findOne({email: decoded.email})
            .exec(function (err, user) {
                user.password = bcrypt.hashSync(req.body.password, 10);
                user.save(function (err) {
                    if (err) {
                        return res.status(401).json({
                            title: 'Fehler',
                            error: err
                        });
                    }

                    res.status(201).json({
                        title: 'Erfolgreich!',
                        message: 'Du hast dein Passwort geändert'
                    });

                })
            });

    });
});

/** Check if it a reg user **/
router.use('/', function (req, res, next) {
    jwt.verify(req.get('Authorization'), secret.userSecret, function (err, decoded) {
        if (err) {
            jwt.verify(req.get('Authorization'), secret.orgaSecret, function (err2, decoded2) {
                if (err2) {
                    jwt.verify(req.get('Authorization'), secret.adminSecret, function (err3, decoded3) {
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

/** routes that can only use reg user **/

router.use('/reg/user', userRoutes);
router.use('/reg/news', newsRoutes);
router.use('/reg/server', serverRoutes);
router.use('/reg/sendMail', sendMailRoutes);
router.use('/reg/event', timetableRoutes);
router.use('/reg/clan', clanRoutes);
router.use('/reg/catering', cateringRoutes);
router.use('/reg/tournament', tournamentRoutes);
router.use('/reg/sides', sidesRoutes);


module.exports = router;
