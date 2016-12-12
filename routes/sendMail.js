var express = require('express');
var router = express.Router();
var Server = require('../models/server');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


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
                        }else{
                            next();
                        }

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


router.post('/', function (req, res, next) {
    var smtpConfig = {
        service: '1und1',
        auth: {
            user: 'presse@kjgaming.de',
            pass: 'presseKjG'
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    var mailOptions = {
        from: req.body.info + '<presse@kjgaming.de>', // sender address
        to: 'presse@kjgaming.de', // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        console.log('Message sent: ' + info.response);
        res.status(200).json({
            message: 'Feddback gesendet.',
            obj: info.response
        });

    });
});


module.exports = router;
