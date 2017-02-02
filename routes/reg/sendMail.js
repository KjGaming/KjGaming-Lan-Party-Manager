var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var secret = require('../secret/secret');


router.post('/', function (req, res, next) {
    var smtpConfig = {
        service: '1und1',
        auth: {
            user: 'presse@kjgaming.de',
            pass: secret.passwordEmail
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
