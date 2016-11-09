var express = require('express');
var router = express.Router();
var Server = require('../models/server');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


router.use('/', function (req, res, next) {

    jwt.verify(req.headers.Authorization, '20Kj!G!aming?Rock.17' || '20Kj!G!aming?Rock.Creator.17' || '20Kj!G!aming?Rock.Admin.17', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }

        next();
    });
});


router.post('/', function (req, res, next) {
    var smtpConfig = {
        pool: true,
        host: 'smtp.1und1.de',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'presse@kjgaming.de',
            pass: 'presseKjG'
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    var mailOptions = {
        from: req.body.info + '<foo@blurdybloop.com>', // sender address
        to: 'presse@kjgaming.de', // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});


module.exports = router;
