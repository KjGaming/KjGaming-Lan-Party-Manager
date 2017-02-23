var express = require('express');
var router = express.Router();
var Tournament = require('../../models/tournament');
var Clan = require('../../models/clan');
var jwt = require('jsonwebtoken');
var shuffle = require('shuffle-array')

/** Get all tournaments **/
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

/** Get the selected tournament **/
router.get('/selected', function (req, res, next) {
    var tournamentId = req.query.id;
    Tournament.findById(tournamentId, function (err, event) {
        if (err) {
            return res.status(500).json({
                title: 'Fehler',
                error: {message: 'Hier ist etwas falsch gelaufen!'}
            });
        }
        res.status(200).json({
            title: 'Erfolgreich',
            message: 'alle Informationen sind vorhanden',
            obj: event
        });
    });
});

/** Clans and users can register  **/
/** PARAMS: **/
/** -> mode, id, clanId || userId  **/
router.put('/registration', function (req, res, next) {
    if (req.body.mode == null || req.body.id == null) {
        return res.status(500).json({
            title: 'Fehler',
            error: {'message': 'Es wurde kein Inhalt mitgeschickt'}
        });
    }
    var decoded = jwt.decode(req.get('Authorization'));

    if (req.body.mode == 'Clan') {
        if (req.body.clanId == null) {
            return res.status(500).json({
                title: 'Fehler',
                error: {'message': 'Es wurde kein ClanId mitgeschickt'}
            });
        }
        Clan.findById(req.body.clanId, function (err, clan) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (clan.admin == decoded.user._id) {
                Tournament.findByIdAndUpdate(req.body.id,
                    {$push: {clan: req.body.clanId}},
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
            } else {
                return res.status(500).json({
                    title: 'Fehler',
                    error: {'message': 'Sie sind kein Clan Admin'}
                });
            }
        });
    } else {
        if (req.body.userId == null) {
            return res.status(500).json({
                title: 'Fehler',
                error: {'message': 'Es wurde kein UserId mitgeschickt'}
            });
        }
        if (req.body.userId != decoded.user._id) {
            return res.status(500).json({
                title: 'Fehler',
                error: {'message': 'Sie sind nicht dieser User'}
            });
        }
        Tournament.findByIdAndUpdate(req.body.id,
            {$push: {player: req.body.userId}},
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
router.post('/registration', function (req, res, next) {
    if (req.body.mode == null || req.body.id == null) {
        return res.status(500).json({
            title: 'Fehler',
            error: {'message': 'Es wurde kein Inhalt mitgeschickt'}
        });
    }
    var decoded = jwt.decode(req.get('Authorization'));

    if (req.body.mode == 'Clan') {
        if (req.body.clanId == null) {
            return res.status(500).json({
                title: 'Fehler',
                error: {'message': 'Es wurde kein ClanId mitgeschickt'}
            });
        }
        Clan.findById(req.body.clanId, function (err, clan) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (clan.admin == decoded.user._id) {
                Tournament.findByIdAndUpdate(req.body.id,
                    {$pull: {clan: req.body.clanId}},
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
            } else {
                return res.status(500).json({
                    title: 'Fehler',
                    error: {'message': 'Sie sind kein Clan Admin'}
                });
            }
        });

    } else {
        if (req.body.userId == null) {
            return res.status(500).json({
                title: 'Fehler',
                error: {'message': 'Es wurde kein ClanId mitgeschickt'}
            });
        }
        if (req.body.userId != decoded.user._id) {
            return res.status(500).json({
                title: 'Fehler',
                error: {'message': 'Sie sind nicht dieser User'}
            });
        }
        Tournament.findByIdAndUpdate(req.body.id,
            {$pull: {player: req.body.userId}},
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

/** Save/Update one Game Result **/
router.put('/game/save', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    var whichTeam = null;
    var firstResult = false;
    var foundGame = false;
    var firstResult1;
    var firstResult2;

    Tournament.findById(req.body.tournamentId, function (err, tournament) {
        if (err) {
            return res.status(500).json({
                title: 'Fehler',
                error: {message: 'Turnier wurde nicht gefunden'}
            });
        }
        if (!tournament.games) {
            return res.status(500).json({
                title: 'Fehler',
                error: {message: 'Keine Spiele vorhanden!'}
            });
        }

        for (var key in tournament.games) {

            if (tournament.games[key].gameId == req.body.gameId) {
                firstResult1 = tournament.games[key]['result1'];
                firstResult2 = tournament.games[key]['result2'];

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

                if (req.body.result1 > req.body.result2) {
                    winningTeam = team1;
                    looserTeam = team2;
                } else if (req.body.result1 < req.body.result2) {
                    winningTeam = team2;
                    looserTeam = team1;
                }

                // Check if user is Admin
                if (decoded.user.role != 2) {

                    // User are not in the game
                    if (!whichTeam) {
                        return res.status(500).json({
                            title: 'Fehler',
                            error: {message: 'Keine Berechtigung'}
                        });
                    }

                    // Check if the looser add the result
                    if (req.body.result1 > req.body.result2 && whichTeam != "team2") {
                        return res.status(500).json({
                            title: 'Fehler',
                            error: {message: 'Du bist nicht der Verlierer'}
                        });
                    }

                    if (req.body.result1 < req.body.result2 && whichTeam != "team1") {
                        return res.status(500).json({
                            title: 'Fehler',
                            error: {message: 'Du bist nicht der Verlierer'}
                        });
                    }
                }

                console.log(firstResult1);
                if (firstResult1 == 0 && firstResult2 == 0) {
                    firstResult = true;
                }
                console.log(firstResult);

                Tournament.findOneAndUpdate({"_id": req.body.tournamentId, 'games.gameId': req.body.gameId},
                    {$set: {'games.$.result1': req.body.result1, 'games.$.result2': req.body.result2}},
                    function (err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'Fehler',
                                error: {message: 'Beim speichern ist was schief gelaufen'}
                            });
                        }

                        return res.status(201).json({
                            title: 'Erflogreich',
                            message: 'Ergebnis gespeichert',
                            obj: result,
                            swiss: {
                                id: result._id,
                                winner: req.body.winner,
                                looser: req.body.looser,
                                gameId: req.body.gameId,
                                firstResult: firstResult
                            }
                        });
                    });
            }
        }

    });
});

/** save the changes of a tournament **/
router.put('/save', function (req, res, next) {
    Tournament.findByIdAndUpdate(req.body.id,
        {
            $set: {
                'name': req.body.name,
                'gameName': req.body.gameName,
                'mode': req.body.mode,
                'size': req.body.size,
                'playerMode': req.body.playerMode,
            }
        },
        function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Hier ist ein Fehler aufgetreten',
                    error: err
                });
            }
            res.status(201).json({
                title: 'Erfolgreich',
                message: 'Das Turnier wurde geändert',
                obj: result
            });

        });
});

/** set tournament offline**/
router.put('/offline', function (req, res, next) {
    Tournament.findByIdAndUpdate(req.body.id,
        {
            $set: {
                'name': req.body.name,
                'gameName': req.body.gameName,
                'mode': req.body.mode,
                'size': req.body.size,
                'playerMode': req.body.playerMode,
                'status': 'off'
            }
        },
        function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Hier ist ein Fehler aufgetreten',
                    error: err
                });
            }
            res.status(201).json({
                title: 'Erfolgreich',
                message: 'Das Turnier ist jetzt offline',
                obj: result
            });

        });
});

/** create Tournament **/
router.post('/create', function (req, res, next) {
    var tournament = new Tournament({
        name: req.body.name,
        gameName: req.body.gameName,
        mode: req.body.mode,
        size: req.body.size,
        playerMode: req.body.playerMode,
        statusUser: req.body.statusUser,
        status: 'off'
    });

    tournament.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfolgreich',
            message: 'Das Turnier wurde erstellt',
            obj: result
        });
    });
});

/** create swiss values **/
router.post('/swiss/createResult', function (req, res, next) {
    var insert = [];

    if (!req.body._id) {
        return res.status(500).json({
            title: 'Fehler',
            error: {message: 'Keine Turnier ID vorhanden'}
        });
    }

    Tournament.findById(req.body._id)
        .populate('clan', 'name shortName')
        .populate('users', 'nickName email')
        .exec(function (err, tournament) {
            if (err) {
                return res.status(500).json({
                    title: 'Fehler',
                    error: {message: 'Hier ist ein Fehler aufgetreten'}
                });
            }

            if (tournament.playerMode == 'Clan') {
                for (var i = 0; i < tournament.clan.length; i++) {
                    insert.push({
                        name: tournament.clan[i].name,
                        win: 0,
                        lose: 0,
                        qualified: 0
                    });
                }
            } else {
                for (var i = 0; i < tournament.player.length; i++) {
                    insert.push({
                        name: tournament.player[i].nickName,
                        win: 0,
                        lose: 0,
                        qualified: 0
                    });
                }
            }

            var lengthInsert = insert.length;

            for (var j = insert.length; j < tournament.size; j++) {
                insert.push({
                    name: 'Freilos_' + (j - lengthInsert + 1),
                    win: 0,
                    lose: 0,
                    qualified: 0
                });

            }

            Tournament.findByIdAndUpdate(req.body._id,
                {
                    $set: {
                        "swiss.results": insert
                    }
                }
                ,
                function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'Hier ist ein Fehler aufgetreten',
                            error: {message: 'Hier ist ein Fehler aufgetreten'}
                        });
                    }

                    res.status(201).json({
                        title: 'Erfolgreich',
                        message: 'Den Spielern wurde das SwissSystem zugewiesen',
                        obj: result
                    });
                });
        });
});

/** update the swiss result **/
router.put('/swiss/saveResult', function (req, res, next) {

    Tournament.findById(req.body.id, function (err, tournament) {
        if (err) {
            return res.status(500).json({
                title: 'Fehler',
                error: {message: 'Hier ist ein Fehler aufgetreten'}
            });
        }

        if (req.body.firstResult && !tournament.swiss.bracketRound) {
            for (var i = 0; i < tournament.swiss.results.length; i++) {

                if (tournament.swiss.results[i].name == req.body.winner) {
                    tournament.swiss.results[i].win += 1;
                }
                if (tournament.swiss.results[i].name == req.body.looser) {
                    tournament.swiss.results[i].lose += 1;
                }

                if (tournament.swiss.results[i].win >= 2) {
                    tournament.swiss.results[i].qualified = 1;
                }

                if (tournament.swiss.results[i].lose >= 2) {
                    tournament.swiss.results[i].qualified = 2;
                }
            }
        }

        Tournament.findByIdAndUpdate(req.body.id,
            {
                $set: {
                    'swiss.results': tournament.swiss.results
                }
            }
            , function (err, updateT) {
                if (err) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Hier ist ein Fehler aufgetreten'}
                    });
                }

                res.status(201).json({
                    title: 'Erfolgreich',
                    message: 'Ergebnis erfoglreich geändert',
                    obj: updateT
                });

            });
    });
});

/** set the new games **/
router.put('/swiss/setNewRound', function (req, res) {
    var games = [];

    console.log(req.body.rounds);
    if (req.body.rounds == 2) {
        Tournament.findById(req.body.id, function (err, tournament) {
            if (err) {
                return res.status(500).json({
                    title: 'Fehler',
                    error: {message: 'Hier ist ein Fehler aufgetreten'}
                });
            }

            if (tournament.swiss.secondRound) {
                return res.status(500).json({
                    title: 'Fehler',
                    error: {message: 'Runde 2 wurde schon erstellt'}
                });
            }

            for (var k = 0; k < 4; k++) {
                if (tournament.games[k].result1 == 0 && tournament.games[k].result2 == 0) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Es wurden noch nicht alle Spiele ausgespielt'}
                    });
                }
            }

            games = tournament.games;
            var winner = [];
            var looser = [];

            for (var i = 0; i < tournament.swiss.results.length; i++) {
                if (tournament.swiss.results[i].win == 1) {
                    winner.push(tournament.swiss.results[i].name);
                } else {
                    looser.push(tournament.swiss.results[i].name);
                }
            }

            winner = shuffle(winner);
            looser = shuffle(looser);

            for (var j = 4; j < 8; j++) {
                if (j == 4) {
                    games[j].team1 = winner[j - j];
                    games[j].team2 = winner[j - j + 1];
                } else if (j == 5) {
                    games[j].team1 = winner[j - j + 2];
                    games[j].team2 = winner[j - j + 3];
                } else if (j == 6) {
                    games[j].team1 = looser[j - j];
                    games[j].team2 = looser[j - j + 1];
                } else if (j == 7) {
                    games[j].team1 = looser[j - j + 2];
                    games[j].team2 = looser[j - j + 3];
                }
            }

            Tournament.findByIdAndUpdate(req.body.id, {
                $set: {
                    'games': games,
                    'swiss.secondRound': true
                }
            }, function (err, updateT) {
                if (err) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Hier ist ein Fehler aufgetreten'}
                    });
                }
                res.status(201).json({
                    title: 'Erfolgreich',
                    message: 'Ergebnis erfoglreich geändert',
                    winner: winner,
                    looser: looser
                });
            });
        });
    }
    else if (req.body.rounds == 3) {
        Tournament.findById(req.body.id, function (err, tournament) {
            if (err) {
                return res.status(500).json({
                    title: 'Fehler',
                    error: {message: 'Hier ist ein Fehler aufgetreten'}
                });
            }

            if (tournament.swiss.thirdRound) {
                return res.status(500).json({
                    title: 'Fehler',
                    error: {message: 'Runde 3 wurde schon erstellt'}
                });
            }

            for (var k = 4; k < 8; k++) {
                if (tournament.games[k].result1 == 0 && tournament.games[k].result2 == 0) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Es wurden noch nicht alle Spiele ausgespielt'}
                    });
                }
            }

            games = tournament.games;
            var round3 = [];

            for (var i = 0; i < tournament.swiss.results.length; i++) {
                if (tournament.swiss.results[i].win == 1) {
                    round3.push(tournament.swiss.results[i].name);
                }
            }

            round3 = shuffle(round3);

            for (var j = 8; j < 10; j++) {
                if (j == 8) {
                    games[j].team1 = round3[j - j];
                    games[j].team2 = round3[j - j + 1];
                } else if (j == 9) {
                    games[j].team1 = round3[j - j + 2];
                    games[j].team2 = round3[j - j + 3];
                }
            }

            Tournament.findByIdAndUpdate(req.body.id, {
                $set: {
                    'games': games,
                    'swiss.thirdRound': true
                }
            }, function (err, updateT) {
                if (err) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Hier ist ein Fehler aufgetreten'}
                    });
                }
                res.status(201).json({
                    title: 'Erfolgreich',
                    message: 'Ergebnis erfoglreich geändert',
                    obj: updateT
                });
            });
        });
    }
    else {
        Tournament.findById(req.body.id, function (err, tournament) {
            if (err) {
                return res.status(500).json({
                    title: 'Fehler',
                    error: {message: 'Hier ist ein Fehler aufgetreten'}
                });
            }

            if (tournament.swiss.bracketRound) {
                return res.status(500).json({
                    title: 'Fehler',
                    error: {message: 'Brackets wurden schon erstellt'}
                });
            }

            for (var k = 8; k < 10; k++) {
                if (tournament.games[k].result1 == 0 && tournament.games[k].result2 == 0) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Es wurden noch nicht alle Spiele ausgespielt'}
                    });
                }
            }

            games = tournament.games;
            var final1 = [];
            var final2 = [];
            var place5_1 = [];
            var place5_2 = [];

            for (var i = 0; i < tournament.swiss.results.length; i++) {
                if (tournament.swiss.results[i].win == 2) {
                    if (tournament.swiss.results[i].lose == 0) {
                        if (!final1[0]) {
                            final1[0] = tournament.swiss.results[i].name;
                        } else {
                            final1[1] = tournament.swiss.results[i].name;
                        }

                    } else {
                        if (!final2[0]) {
                            final2[0] = tournament.swiss.results[i].name;
                        } else {
                            final2[1] = tournament.swiss.results[i].name;
                        }
                    }

                }
                if (tournament.swiss.results[i].lose == 2) {
                    if (tournament.swiss.results[i].win == 0) {
                        if (!place5_1[0]) {
                            place5_1[0] = tournament.swiss.results[i].name;
                        } else {
                            place5_1[1] = tournament.swiss.results[i].name;
                        }

                    } else {
                        if (!place5_2[0]) {
                            place5_2[0] = tournament.swiss.results[i].name;
                        } else {
                            place5_2[1] = tournament.swiss.results[i].name;
                        }
                    }
                }
            }

            final1 = shuffle(final1);
            final2 = shuffle(final2);
            place5_1 = shuffle(place5_1);
            place5_2 = shuffle(place5_2);

            games[10].team1 = place5_1[0];
            games[10].team2 = place5_2[0];
            games[11].team1 = place5_1[1];
            games[11].team2 = place5_2[1];

            games[13].team1 = final1[0];
            games[13].team2 = final2[0];
            games[14].team1 = final1[1];
            games[14].team2 = final2[1];

            Tournament.findByIdAndUpdate(req.body.id, {
                $set: {
                    'games': games,
                    'swiss.bracketRound': true
                }
            }, function (err, updateT) {
                if (err) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Hier ist ein Fehler aufgetreten'}
                    });
                }

                res.status(201).json({
                    title: 'Erfolgreich',
                    message: 'Ergebnis erfolgreich eingereicht',
                    obj: updateT
                });
            });
        });
    }

});

/** set the swiss bracket  **/
router.put('/swiss/bracket', function (req, res) {
    console.log(req.body);
    var gameId = 0;

    if(req.body.gameId == 16 || req.body.gameId == 13){
        return res.status(500).json({
            title: 'Fehler',
            error: {message: 'Keine weiteren Spiele'}
        });
    }

    if(req.body.gameId == 11 || req.body.gameId == 12){
        gameId = 13
    }else{
        gameId = 16
    }

    if (req.body.gameId % 2 != 0) {
        Tournament.findOneAndUpdate({
                "_id": req.body.id,
                'games.gameId': gameId
            },
            {$set: {'games.$.team2': req.body.winningTeam}},
            function (err, res1) {
                if (err) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Beim speichern ist was schief gelaufen'}
                    });
                }
                res.status(201).json({
                    title: 'Erfolgreich',
                    message: 'Das Bracket wurde aktualiesiert',
                    obj: res1
                });
            });
    } else {
        Tournament.findOneAndUpdate({
                "_id": req.body.id,
                'games.gameId': gameId
            },
            {$set: {'games.$.team1': req.body.winningTeam}},
            function (err, res2) {
                if (err) {
                    return res.status(500).json({
                        title: 'Fehler',
                        error: {message: 'Beim speichern ist was schief gelaufen'}
                    });
                }
                res.status(201).json({
                    title: 'Erfolgreich',
                    message: 'Das Bracket wurde aktualiesiert',
                    obj: res2
                });
            });
    }
});

/** create games for the tournament and set the player **/
router.put('/createGames', function (req, res, next) {
    var setInput;
    if (req.body.mode == 'swiss') {
        setInput = {
            $set: {
                'name': req.body.name,
                'gameName': req.body.gameName,
                'mode': req.body.mode,
                'size': req.body.size,
                'playerMode': req.body.playerMode,
                'status': req.body.status,
                'swiss': {
                    'secondRound': false,
                    'thirdRound': false,
                    'bracketRound': false
                }
            }
        }
    } else {
        setInput = {
            $set: {
                'name': req.body.name,
                'gameName': req.body.gameName,
                'mode': req.body.mode,
                'size': req.body.size,
                'playerMode': req.body.playerMode,
                'status': req.body.status
            }
        }
    }
    Tournament.findByIdAndUpdate(req.body.id, setInput,
        function (err, saveT) {
            var games = [];
            var databaseName;
            var databaseValues;
            var gameSize;

            if (err) {
                return res.status(500).json({
                    title: 'Hier ist ein Fehler aufgetreten',
                    error: err
                });
            }

            switch (req.body.mode) {
                case 'swiss':
                    gameSize = 16;
                    break;
                case 'b16':
                    gameSize = 15;
                    break;
                case 'b8':
                    gameSize = 7;
                    break;
                case 'b4':
                    gameSize = 3;
                    break;
            }

            var rounds;
            for (var i = 0; i < gameSize; i++) {
                if (i < 4) {
                    rounds = '0-0'
                } else if (i < 6) {
                    rounds = '1-0'
                } else if (i < 8) {
                    rounds = '0-1'
                } else {
                    rounds = '1-1'
                }
                games[i] = {
                    gameId: i + 1,
                    team1: 'tba',
                    team2: 'tba',
                    result1: 0,
                    result2: 0,
                    rounds: rounds
                };
            }
            if (req.body.playerMode == 'User') {
                databaseName = 'users';
                databaseValues = 'nickName';
            } else {
                databaseName = 'clan';
                databaseValues = 'name';
            }

            Tournament.findById(req.body.id)
                .populate(databaseName, databaseValues)
                .exec(function (err, selectTournament) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    var member = [];


                    if (req.body.playerMode == 'User') {
                        for (var key in selectTournament.player) {
                            member[key] = selectTournament.player[key].nickName;
                        }
                    } else {
                        for (var key in selectTournament.clan) {

                            member[key] = selectTournament.clan[key].name;
                        }
                    }

                    if (member.length != req.body.size && member.length < req.body.size) {
                        var lengthMember = member.length;
                        for (var i = member.length; i < req.body.size; i++) {
                            member[i] = "Freilos_" + (i - lengthMember + 1);
                        }
                    }

                    member = shuffle(member);

                    for (var i = 0; i < (member.length / 2); i++) {
                        for (var j = 0; j < 2; j++) {
                            if (j == 0) {
                                games[i].team1 = member[i + i + j];
                            } else {
                                games[i].team2 = member[i + i + j];
                            }
                        }
                    }

                    console.log(games);

                    Tournament.findByIdAndUpdate(req.body.id, {$set: {'games': games}}, function (err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'Hier ist ein Fehler aufgetreten',
                                error: err
                            });
                        }
                        res.status(201).json({
                            title: 'Erfolgreich',
                            message: 'Das Turnier wurde online gesetzt',
                            obj: result
                        });
                    });

                });

        });


});


module.exports = router;

