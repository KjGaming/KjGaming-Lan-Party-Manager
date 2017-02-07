var express = require('express');
var router = express.Router();
var Tournament = require('../../models/tournament');
var Clan = require('../../models/clan');
var jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
    Tournament.find()
        .exec(function (err, event) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: event
            });
        });
});

router.get('/selected', function (req, res, next) {
    var tournamentId = req.query.id;
    Tournament.findById(tournamentId, function (err, event) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: event
        });
    });
});

/** Clans and users can register  **/
/** PARAMS: **/
/** -> mode, id, clanId || userId  **/
router.put('/registration', function (req, res, next){
    if(req.body.mode == null || req.body.id == null){
        return res.status(500).json({
            title: 'Fehler',
            error: {'message':'Es wurde kein Inhalt mitgeschickt'}
        });
    }
    var decoded = jwt.decode(req.get('Authorization'));

    if(req.body.mode == 'Clan'){
        if(req.body.clanId == null){
            return res.status(500).json({
                title: 'Fehler',
                error: {'message':'Es wurde kein ClanId mitgeschickt'}
            });
        }
        Clan.findById(req.body.clanId, function (err, clan) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if(clan.admin == decoded.user._id){
                Tournament.findByIdAndUpdate(req.body.id,
                    { $push: { clan: req.body.clanId } },
                    function (err, tournament) {
                        if (err) {
                            return res.status(500).json({
                                title: 'Fehler beim Turnier',
                                error: err
                            });
                        }
                        return res.status(201).json({
                            title: 'Erfolgreich',
                            message: 'Du hast deinen Clan angemeldet',
                            obj: tournament
                        });
                    });
            }else{
                return res.status(500).json({
                    title: 'Fehler',
                    error: {'message': 'Sie sind kein Clan Admin'}
                });
            }
        });
    }else{
        if(req.body.userId == null){
            return res.status(500).json({
                title: 'Fehler',
                error: {'message':'Es wurde kein UserId mitgeschickt'}
            });
        }
        if(req.body.userId != decoded.user._id){
            return res.status(500).json({
                title: 'Fehler',
                error: {'message':'Sie sind nicht dieser User'}
            });
        }
        Tournament.findByIdAndUpdate(req.body.id,
            { $push: { player: req.body.userId } },
            function (err, tournament) {
                if (err) {
                    return res.status(500).json({
                        title: 'Fehler beim Turnier',
                        error: err
                    });
                }
                return res.status(201).json({
                    title: 'Erfolgreich',
                    message: 'Du hast dich angemeldet',
                    obj: tournament
                });
            });
    }
});

/** Clans and users can delete register  **/
router.post('/registration', function (req, res, next){
    if(req.body.mode == null || req.body.id == null){
        return res.status(500).json({
            title: 'Fehler',
            error: {'message':'Es wurde kein Inhalt mitgeschickt'}
        });
    }
    var decoded = jwt.decode(req.get('Authorization'));

    if(req.body.mode == 'Clan'){
        if(req.body.clanId == null){
            return res.status(500).json({
                title: 'Fehler',
                error: {'message':'Es wurde kein ClanId mitgeschickt'}
            });
        }
        Clan.findById(req.body.clanId, function (err, clan) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if(clan.admin == decoded.user._id){
                Tournament.findByIdAndUpdate(req.body.id,
                    { $pull: { clan: req.body.clanId } },
                    function (err, tournament) {
                        if (err) {
                            return res.status(500).json({
                                title: 'Fehler beim Turnier',
                                error: err
                            });
                        }
                        return res.status(201).json({
                            title: 'Erfolgreich',
                            message: 'Du hast deinen Clan abgemeldet',
                            obj: tournament
                        });
                    });
            }else{
                return res.status(500).json({
                    title: 'Fehler',
                    error: {'message': 'Sie sind kein Clan Admin'}
                });
            }
        });

    }else{
        if(req.body.userId == null){
            return res.status(500).json({
                title: 'Fehler',
                error: {'message':'Es wurde kein ClanId mitgeschickt'}
            });
        }
        if(req.body.userId != decoded.user._id){
            return res.status(500).json({
                title: 'Fehler',
                error: {'message':'Sie sind nicht dieser User'}
            });
        }
        Tournament.findByIdAndUpdate(req.body.id,
            { $pull: { player: req.body.userId } },
            function (err, tournament) {
                if (err) {
                    return res.status(500).json({
                        title: 'Fehler beim Turnier',
                        error: err
                    });
                }
                return res.status(201).json({
                    title: 'Erfolgreich',
                    message: 'Du hast dich abgemeldet',
                    obj: tournament
                });
            });
    }
});

// save/update one Game Result
router.post('/save', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    var whichTeam = null;


    Tournament.findById(req.body.tournamentId, function (err, tournament) {
        if (err) {
            return res.status(500).json({
                title: 'Fehler beim Turnier',
                error: err
            });
        }
        for (var key in tournament.games) {

            if (tournament.games[key].gameId == req.body.gameId) {

                var team1 = tournament.games[key]['team1'];
                var team2 = tournament.games[key]['team2'];
                var winningTeam = null;
                var looserTeam = null;


                // Check if reg and clan. Also check if reg or clan in this game
                if (tournament.playerMode == 'Clan') {
                    for (var key in decoded.user.clan) {
                        if (decoded.user.clan[key].name == team1) {
                            whichTeam = 'team1';
                            break;
                        } else if (decoded.user.clan[key].name == team2) {
                            whichTeam = 'team2';
                            break;
                        }
                    }
                } else {
                    if (decoded.user.nickName == team1) {
                        whichTeam = 'team1';
                    } else if (decoded.user.nickName == team2) {
                        whichTeam = 'team2';
                    }
                }

                if(req.body.result1 > req.body.result2){
                    winningTeam = team1;
                    looserTeam = team2;
                }else if(req.body.result1 < req.body.result2){
                    winningTeam = team2;
                    looserTeam = team1;
                }

                // Check if user is Admin
                if (decoded.user.role != 2) {

                    // User are not in the game
                    if (!whichTeam) {
                        return res.status(500).json({
                            title: 'Keine Berechtigung',
                            error: err
                        });
                    }

                    // Check if the looser add the result
                    if (req.body.result1 > req.body.result2 && whichTeam != "team2") {
                        return res.status(500).json({
                            title: 'Fehler',
                            error: {error: 'Du bist nicht der Verlierer'}
                        });
                    }

                    if (req.body.result1 < req.body.result2 && whichTeam != "team1") {
                        return res.status(500).json({
                            title: 'Fehler',
                            error: {error: 'Du bist nicht der Verlierer'}
                        });
                    }
                }

                Tournament.findOneAndUpdate({"_id": req.body.tournamentId, 'games.gameId': req.body.gameId },
                    {$set:{'games.$.result1': req.body.result1 ,'games.$.result2': req.body.result2}},
                    function(err, result){
                        if(err){
                            return res.status(500).json({
                                title: 'Fehler beim speichern',
                                error: err
                            });
                        }
                        if(req.body.winnerGame){

                            if(req.body.gameId % 2 == 0){
                                Tournament.findOneAndUpdate({"_id": req.body.tournamentId, 'games.gameId': req.body.winnerGame },
                                    {$set:{'games.$.team2': winningTeam}},
                                    function(err, result) {
                                        if(err){
                                            return res.status(500).json({
                                                title: 'Fehler beim speichern',
                                                error: err
                                            });
                                        }
                                    });
                            }else{
                                Tournament.findOneAndUpdate({"_id": req.body.tournamentId, 'games.gameId': req.body.winnerGame },
                                    {$set:{'games.$.team1': winningTeam}},
                                    function(err, result) {
                                        if(err){
                                            return res.status(500).json({
                                                title: 'Fehler beim speichern',
                                                error: err
                                            });
                                        }
                                    });
                            }

                        }

                        if(req.body.looserGame){
                            if(req.body.gameId % 2 == 0){
                                Tournament.findOneAndUpdate({"_id": req.body.tournamentId, 'games.gameId': req.body.looserGame },
                                    {$set:{'games.$.team2': looserTeam}},
                                    function(err, result) {
                                        if(err){
                                            return res.status(500).json({
                                                title: 'Fehler beim speichern',
                                                error: err
                                            });
                                        }
                                    });
                            }else{
                                Tournament.findOneAndUpdate({"_id": req.body.tournamentId, 'games.gameId': req.body.looserGame },
                                    {$set:{'games.$.team1': looserTeam}},
                                    function(err, result) {
                                        if(err){
                                            return res.status(500).json({
                                                title: 'Fehler beim speichern',
                                                error: err
                                            });
                                        }
                                    });
                            }
                        }
                        return res.status(201).json({
                            message: 'Ergebnis gespeichert',
                            obj: result
                        });
                });
            }
        }
    });
});

router.post('/create', function (req, res, next) {
    var tournament = new Tournament({
        name: req.body.name,
        gameName: req.body.gameName,
        mode: req.body.mode,
        size: req.body.size,
        playerMode: req.body.playerMode,
        status : 'off'
    });

    tournament.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            message: 'Neues Tournament erstellt',
            obj: result
        });
    });
});

router.post('/createGames', function (req, res, next) {
    var tournament = {
        gameId: req.body.gameId,
        team1: req.body.team1,
        team2: req.body.team2,
        result1: req.body.result1,
        result2: req.body.result2
    };

    Tournament.findByIdAndUpdate(req.body.id, {$push: {'games': tournament}}, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            message: 'Neues Game erstellt',
            obj: result
        });
    });
});

module.exports = router;

