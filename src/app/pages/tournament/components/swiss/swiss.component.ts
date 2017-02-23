import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs4-modal/components/modal";
import {SmartTablesService} from './smartTables.service';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {BaTournamentService} from "../../../../theme/services/baTournament/baTournament.service";
import {BaClanService} from "../../../../theme/services/baClan/baClan.service";
import {error} from "util";

@Component({
    selector: 'swiss',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./swiss.scss')],
    template: require('./swiss.component.html')
})
export class SwissComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    @ViewChild('match') match: ModalComponent;

    swissSubscriber: number = 16;
    swissResult = [2, 1, 0, 2, 3, 4, 5, 1];
    swissResultTable = [];
    swissRound: Object = ['Runde 1', 'Runde 2', 'Runde 3'];
    swissMatch: Object = {
        "Runde 1": [
            {
                "team1": "Team 1",
                "team2": "ORGA",
                "result": "0:0",
                "result1": 0,
                "result2": 0,
                "rounds": "0-0",
                "game": 1
            },
            {
                "team1": "Team 3",
                "team2": "Team 4",
                "result": "0:0",
                "result1": 0,
                "result2": 0,
                "rounds": "0-0",
                "game": 2
            },
            {
                "team1": "Team 5",
                "team2": "Team 6",
                "result": "0:0",
                "result1": 0,
                "result2": 0,
                "rounds": "0-0",
                "game": 3
            },
            {
                "team1": "Team 7",
                "team2": "Team 8",
                "result": "0:0",
                "result1": 0,
                "result2": 0,
                "rounds": "0-0",
                "game": 4
            }
        ],
        "Runde 2": [],
        "Runde 3": [],
        "Runde 4": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 11
        },
        "Runde 5": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 12
        },
        "Runde 6": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 13
        },
        "Runde 7": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 14
        },
        "Runde 8": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 15
        },
        "Runde 9": {
            "team1": "LALA",
            "team2": "LOPLOP",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 16
        }


    };
    selectMatch = {};
    userClanName = [];
    userAdminId = '';


    tournament; // The whole tournament
    tournamentId; // The tournament ID
    public games = []; // All Games in this tournament


    //Variable for input the Value
    userStatus = localStorage.getItem('blackWidow');

    public resultForm: FormGroup;

    constructor(private _tournamentService: BaTournamentService,
                private route: ActivatedRoute,
                public fb: FormBuilder,
                private _toastService: NotificationsService,
                private _clanService: BaClanService) {
        this.route.params.subscribe(params => {
            this.tournamentId = params['tournamentId'];
        });
    }

    ngOnInit() {
        this.getTournament(this.tournamentId);
        this.userAdminId = localStorage.getItem('blackWidow');
        this.getUserClanName();
        /* console.log(this.swissMatch);*/
    }

    getTournament(id) {
        this._tournamentService.getTournamentInfos(id).subscribe(
            // the first argument is a function which runs on success
            data => {
                this.tournament = data.obj;
                console.log(data.obj.swiss.results);
                this.swissResultTable = [];
                for(let player of data.obj.swiss.results){
                    this.swissResultTable.push({
                        name: player.name,
                        win: player.win,
                        lose: player.lose,
                        qualified: player.qualified
                    })
                }

                console.log(this.swissResultTable);
                for (let i = 1; i <= 3; i++) {
                    switch (i) {
                        case 1:
                            this.swissMatch['Runde ' + i] = [
                                data.obj.games[i - 1],
                                data.obj.games[i],
                                data.obj.games[i + 1],
                                data.obj.games[i + 2],
                            ];
                            break;
                        case 2:
                            this.swissMatch['Runde ' + i] = [
                                data.obj.games[i + 2],
                                data.obj.games[i + 3],
                                data.obj.games[i + 4],
                                data.obj.games[i + 5],
                            ];
                            break;
                        case 3:
                            this.swissMatch['Runde ' + i] = [
                                data.obj.games[i + 5],
                                data.obj.games[i + 6],
                            ];
                            break;
                    }

                }


                for (let i = 4; i < 10; i++) {
                    this.swissMatch['Runde ' + i] = data.obj.games[i + 6];
                }
                console.log(this.swissMatch);

            },
            // the second argument is a function which runs on error
            err => {
                this._toastService.error(err.title, err.error.message);
            },
            // the third argument is a function which runs on completion
            () => console.log('loading clan')
        );
    }

    getUserClanName() {
        this._clanService.getClanList().subscribe(
            // the first argument is a function which runs on success
            data => {
                for (let key in data.obj) {
                    this.userClanName[key] = data.obj[key].name;
                }
            },
            // the second argument is a function which runs on error
            err => {
                this._toastService.error(err.title, err.error.message);
            },
            // the third argument is a function which runs on completion
            () => console.log('loading clan')
        );
    }

    openMatchInfo(match) {
        let splitResult;

        for (let userClan of this.userClanName) {
            if (userClan == match.team1 || userClan == match.team2) {
                match["isInClan"] = true;
                break;
            } else {
                match["isInClan"] = false;
            }
        }

        if (match.result1 > 0 || match.result2 > 0) {
            match["resultSave"] = true;
        } else {
            match["resultSave"] = false;
        }

        this.match.open();
        this.selectMatch = match;
        /*console.log(this.selectMatch);*/
    }

    whoIsWinner(match, team) {
        if (match.result1 || match.result2) {
            if (team == "team1") {
                if (match.result1 > match.result2) {
                    return {'winner': true};
                } else {
                    return {'winner': false};
                }
            } else if (team == "team2") {
                if (match.result1 < match.result2) {
                    return {'winner': true};
                } else {
                    return {'winner': false};
                }
            }
        } else {
            return {'winner': false};
        }
    }

    saveGameResult(match) {
        this.match.close();
        let winner;
        let looser;
        let input

        if (match.result1 > match.result2) {
            winner = match.team1;
            looser = match.team2;
        } else {
            winner = match.team2;
            looser = match.team1;
        }

        input = {
            "gameId": match.gameId,
            "tournamentId": this.tournamentId,
            "result1": match.result1,
            "result2": match.result2,
            "winner": winner,
            "looser": looser
        };

        let round = 0;

        this._tournamentService.saveGameResult(input).subscribe(
            // the first argument is a function which runs on success
            data => {
                /*console.log(data.swiss);*/
                this._tournamentService.swissSaveResult(data.swiss).subscribe(
                    data2 => {
                        this._toastService.success(data2.title, data2.message);

                        if(data2.obj.swiss.secondRound){
                            if(data2.obj.swiss.thirdRound){
                                round = 4;
                            }else{
                                round = 3;
                            }
                        }else{
                            round = 2;
                        }

                        let dataInside = {
                            id: data2.obj._id,
                            rounds: round,
                            gameId : input.gameId,
                            winningTeam: input.winner
                        };
                        this.ngOnInit();

                        if(data2.obj.swiss.bracketRound){
                            this._tournamentService.swissSaveBracket(dataInside).subscribe(
                                data3 => {
                                    this.ngOnInit();
                                },
                                // the second argument is a function which runs on error
                                err => {
                                    console.error(err);
                                },
                                // the third argument is a function which runs on completion
                                () => console.log('save Game')
                            );
                        }else{
                            this._tournamentService.swissSetNewRound(dataInside).subscribe(
                                data3 => {
                                    this.ngOnInit();
                                },
                                // the second argument is a function which runs on error
                                err => {
                                    console.error(err);
                                },
                                // the third argument is a function which runs on completion
                                () => console.log('save Game')
                            );
                        }

                    },
                    // the second argument is a function which runs on error
                    err => {
                        console.error(err);
                    },
                    // the third argument is a function which runs on completion
                    () => console.log('save Game')
                );
            },
            // the second argument is a function which runs on error
            err => {
                console.error(err);
            },
            // the third argument is a function which runs on completion
            () => console.log('save Game')
        );
    }

}
