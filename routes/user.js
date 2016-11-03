var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

// Change this to your secret
var secret = require('../secret/secret.kjgaming');


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
        lanPacketId: req.body.lanPacket,


    });

    user.save(function (err, result) {

        console.log(user);
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
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
