let express = require('express');
let router = express.Router();
let Message = require('../../models/message');


router.get('/', function (req, res, next) {
	Message.find().exec(function (err, msg) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: msg
        });
    });
});


module.exports = router;
