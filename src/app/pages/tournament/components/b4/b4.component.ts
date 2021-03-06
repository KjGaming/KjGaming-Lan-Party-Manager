import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs4-modal/components/modal";
import { SmartTablesService } from './smartTables.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationsService } from "angular2-notifications/src/notifications.service";
import { BaTournamentService } from "../../../../theme/services/baTournament/baTournament.service";
import { ServerComponent } from "app/pages/server";

@Component({
	selector: 'bracket-4',
	encapsulation: ViewEncapsulation.None,
	styles: [require('./b4.scss')],
	template: require('./b4.component.html')
})
export class B4Component implements OnInit {
	public options = {
		position: ["top", "center"],
		timeOut: 5000
	};

	@ViewChild('match') match: ModalComponent;
	selectMatch = {};
	userStatus = localStorage.getItem('blackWidow');

	tournament; // The whole tournament
	tournamentId; // The tournament ID
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
			"game": 3
		},
	};

	constructor(private _tournamentService: BaTournamentService,
				private route: ActivatedRoute,
				public fb: FormBuilder,
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
				for (let game of data.obj.games) {
					this.games['Runde ' + game.gameId] = game;
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

		function isInClan(value){
			if(match.team1 == value || match.team2 == value){
				return true;
			}else {
				return false;
			}
		}

		if(this.tournament.playerMode == 'User'){
			match["isInClan"] = isInClan(user);

		}else{
			for(let uClan of clans){
				match["isInClan"] = isInClan(uClan.name);
				if(match.isInClan){
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
