import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {BaTournamentService} from "../../../../theme/services/baTournament/baTournament.service";
import {ModalComponent} from "ng2-bs4-modal/components/modal";

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

    @ViewChild('match') match: ModalComponent;
    selectMatch = {};
    userStatus = localStorage.getItem('blackWidow');
	repeat4 = [1,2,3,4];

    tournament; // The whole tournament
    tournamentId; // The tournament ID
	row1 = [
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		}
		];
	row2 = [
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		}
	];
	row3 = [
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		},
		{
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1,
			"height" : 200
		}
	];

    games: Object = {
		'Runde 1': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 1
		},
		'Runde 2': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 2
		},
		'Runde 3': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 2
		},
		'Runde 4': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 5': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 6': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 7': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 8': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 9': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 10': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 11': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 12': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 13': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 14': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		},
		'Runde 15': {
			"team1": "TBA",
			"team2": "TBA",
			"result1": 0,
			"result2": 0,
			"result": "0:0",
			"rounds": "0-0",
			"game": 3
		}
	};

    constructor(private _tournamentService: BaTournamentService,
                private route: ActivatedRoute,
                private _toastService: NotificationsService) {
        this.route.params.subscribe(params => {
            this.tournamentId = params['tournamentId'];
        });
    }

    ngOnInit() {
        this.getTournament(this.tournamentId);
    }

    getTournament(id) {
        this._tournamentService.getTournamentInfos(id).subscribe(
            // the first argument is a function which runs on success
            data => {
                console.log(data.obj);
                this.tournament = data.obj;
                this.row1 = [];
                this.row2 = [];
                this.row3 = [];
                for (let game of data.obj.games) {
                    this.games['Runde ' + game.gameId] = game;
                    if(game.gameId < 9){
						this.row1.push(game);
					}else if(game.gameId < 13){
                    	switch(game.gameId){
							case 9: game.height = 120; break;
							default: game.height = 165; break;
						}
						this.row2.push(game);
					}else if(game.gameId < 15){
						if(game.gameId == 13){
							game.height = 200;
						}else{
							game.height = 333;
						}
						this.row3.push(game);
					}
                }
                console.log(this.games);

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }

    saveGameResult(match) {
        this.match.close();
        let winner;
        let looser;
        let input;

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
                console.log(data);
                let i = {
                    tournamentId: data.obj._id,
                    gameId: data.swiss.gameId,
                    winner: data.swiss.winner
                };
                this._tournamentService.setNextGame(i).subscribe(
                    data2 => {
                        this._toastService.success(data2.title, data2.message);
                        this.ngOnInit();
                    },
                    error => {
                        console.error(error);
                    }
                );
            },
            // the second argument is a function which runs on error
            err => {
                console.error(err);
            }
        );
    }

    openMatchInfo(match) {
        let user = localStorage.getItem('nickName');
        let clans = JSON.parse(localStorage.getItem('clans'));

        function isInClan(value) {
            if (match.team1 == value || match.team2 == value) {
                return true;
            } else {
                return false;
            }
        }

        if (this.tournament.playerMode == 'User') {
            match["isInClan"] = isInClan(user);

        } else {
            for (let uClan of clans) {
                match["isInClan"] = isInClan(uClan.name);
                if (match.isInClan) {
                    break;
                }
            }
        }

        if (match.result1 > 0 || match.result2 > 0) {
            match["resultSave"] = true;
        } else {
            match["resultSave"] = false;
        }

        this.match.open();
        this.selectMatch = match;
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

}
