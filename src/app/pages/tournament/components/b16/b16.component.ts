import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {SmartTablesService} from './smartTables.service';
import {TournamentService} from "../../tournament.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {NotificationsService} from "angular2-notifications/src/notifications.service";

@Component({
    selector: 'bracket-16',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./b16.scss')],
    template: require('./b16.component.html')
})
export class B16Component implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    tournament; // The whole tournament
    tournamentId; // The tournament ID
    public games = []; // All Games in this tournament

    /** For the bracket **/
    public row1 = [];
    public row2 = [];
    public row3 = [];
    public row4 = [];
    repeat4 = [1, 2, 3, 4];


    //Variable for input the Value
    userStatus = localStorage.getItem('blackWidow');
    gameGameId;
    gameTeam1;
    gameTeam2;
    gameResult1;
    gameResult2;
    gameTimeStart;
    gameTimeDuration;
    gameMap;
    players1 = ['genin', 'SciTe', 'gabba', 'ata', 'bot'];
    players2 = ['genin', 'SciTe', 'gabba', 'ata', 'bot'];
    inGamen = null;//team1, team2, admin or null

    public resultForm: FormGroup;


    constructor(private _tournamentService: TournamentService,
                private route: ActivatedRoute,
                public fb: FormBuilder,
                private _toastService: NotificationsService) {
        this.route.params.subscribe(params => {
            this.tournamentId = params['tournamentId'];
        });

        this.resultForm = this.fb.group({
            result1: ["", Validators.required],
            result2: ["", Validators.required]
        });

    }

    ngOnInit() {
        this.getTournament(this.tournamentId);
    }


    getTournament(id) {
        this._tournamentService.getTournamentInfos(id).subscribe(
            // the first argument is a function which runs on success
            data => {
                this.tournament = data.obj;
                this.games = data.obj.games;
                for (let game of this.games) {
                    if (game.gameId <= 8) {
                        this.row1.push(game);
                    } else if (game.gameId <= 12 && game.gameId >= 9) {
                        this.row2.push(game);
                    } else if (game.gameId == 13 || game.gameId == 14) {
                        this.row3.push(game);
                    } else if (game.gameId == 15 || game.gameId == 16) {
                        this.row4.push(game);
                    }
                }

                if (data.obj.playerMode == "Clan") {

                } else {

                }

                console.log(this.games);
                console.log(this.row1);

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }

    clickIt(game) {
        this.gameGameId = game.gameId;
        this.gameTeam1 = game.team1;
        this.gameTeam2 = game.team2;
        this.gameResult1 = game.result1;
        this.gameResult2 = game.result2;
        this.gameTimeStart = game.timeStart;
        this.gameTimeDuration = game.timeDuration;
        this.gameMap = game.map;
        this.inGamen = null;

        //Check if reg is in this game
        if (this.tournament.playerMode == "Clan") {
            //get the clan of the User
            var clans = JSON.parse(localStorage.getItem('clans'));
            for (let clan of clans) {
                if (clan.name == game.team1) {
                    this.inGamen = "team1";
                    break;
                } else if (clan.name == game.team2) {
                    this.inGamen = "team2";
                    break;
                }
            }
        } else {
            var nickName = JSON.parse(localStorage.getItem('nickName'));
            if (nickName == game.team1) {
                this.inGamen = "team1";
            } else if (nickName == game.team2) {
                this.inGamen = "team2";
            }
        }

        if (JSON.parse(localStorage.getItem('blackWidow')) == 481) {
            this.inGamen = "admin";
        }

    }

    saveResult(event) {
        event['gameId'] = this.gameGameId;
        event['tournamentId'] = this.tournamentId;
        event['inGame'] = this.inGamen;

        switch (this.gameGameId) {
            case 1:
            case 2:
                event['winnerGame'] = 9;
                event['looserGame'] = null;
                break;
            case 3:
            case 4:
                event['winnerGame'] = 10;
                event['looserGame'] = null;
                break;
            case 5:
            case 6:
                event['winnerGame'] = 11;
                event['looserGame'] = null;
                break;
            case 7:
            case 8:
                event['winnerGame'] = 12;
                event['looserGame'] = null;
                break;
            case 9:
            case 10:
                event['winnerGame'] = 13;
                event['looserGame'] = null;
                break;
            case 11:
            case 12:
                event['winnerGame'] = 14;
                event['looserGame'] = null;
                break;
            case 13:
            case 14:
                event['winnerGame'] = 15;
                event['looserGame'] = 16;
                break;
            default:
                event['winnerGame'] = null;
                event['looserGame'] = null;
                break;
        }

        console.log(event);

        if (event.result1 > event.result2 && event.inGame == "team2") {
            this._tournamentService.postTournamentResult(event)
                .subscribe(
                    data => {
                        this._toastService.success(data.message, '');
                    },
                    error => {
                        console.error(error);
                        this._toastService.error(error.title, error.error.message);

                    }
                );
        } else if (event.result1 < event.result2 && event.inGame == "team1") {
            this._tournamentService.postTournamentResult(event)
                .subscribe(
                    data => {
                        this._toastService.success(data.message, '');
                    },
                    error => {
                        console.error(error);
                        this._toastService.error(error.title, error.error.message);

                    }
                );
        } else if (event.inGame == "admin") {
            this._tournamentService.postTournamentResult(event)
                .subscribe(
                    data => {
                        this._toastService.success(data.message, '');
                    },
                    error => {
                        console.error(error);
                        this._toastService.error(error.title, error.error.message);

                    }
                );
        } else {
            this._toastService.error('Fehler', 'Das Ergebnis konnt so nicht übertragen werden');
        }


    }

}
