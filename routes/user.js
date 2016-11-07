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
        street: req.body.street,
        nr: req.body.nr,
        postalCode: req.body.postalCode,
        city: req.body.city,
        agb: req.body.agb,
        lanPacketId: req.body.packetId,
        lanFood: req.body.lanFood,
        lanVegi: req.body.lanVegi,
        lanPacketPaid: req.body.packetPaid,
        lanPacketPrice: req.body.packetPrice

    });

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
                title: 'Anmeldung fehlgeschlagen',
                error: {message: 'Passwort oder E-Mail ist Falsch'},
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
    User.findOne({email: req.body.email}, function (err, user) {
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
        var token = jwt.sign({user: user}, '20Kj!G!aming?Rock.17', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, '20Kj!G!aming?Rock.17', function (err, decoded) {
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

    User.find()
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

module.exports = router;
