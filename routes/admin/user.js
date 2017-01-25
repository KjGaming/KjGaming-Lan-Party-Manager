var express = require('express');
var router = express.Router();

var User = require('../models/reg');
var Clan = require('../models/clan');

/** change reg user data ==> admin **/
router.put('/', function (req, res, next) {
    User.findById(req.body._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        console.log(req.body);

        if (req.body.packetPaid != null) {
            user.lan.packet.paid = req.body.packetPaid;
        }
        if (req.body.food != null) {
            user.lan.food = req.body.food;
        }
        if (req.body.paid != null) {
            user.lan.paid = req.body.paid;
        }
        if (req.body.role != null) {
            user.role = req.body.role;
        }
        if (req.body.lock != null) {
            user.lock = req.body.lock;
        }

        user.save(function (err, updatedUser) {
            if (err) {
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


/** delete a user **/
router.delete('/:id', function (req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({
            title: 'No news selected',
            error: err
        });
    }
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (user == null) {
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

                        if (clan.admin == req.params.id) {
                            console.log('admin');
                            /** change admin to next reg **/
                            Clan.findByIdAndUpdate(clan._id, {
                                    $pull: {user: req.params.id},
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
                            /** drop reg from clan **/
                            console.log('no admin');
                            Clan.findByIdAndUpdate(clan._id, {$pull: {user: req.params.id}},
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


module.exports = router;