//TODO: Event ID aus Turnier/Game löschen, wenn Event gelöscht wird
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "angular2-notifications";
import { BaTournamentService } from "../../../../theme/services/baTournament/baTournament.service";
import { BaEventService } from "../../../../theme/services/baEvent/baEvent.service";

@Component({
	selector: 'admin-tournament',
	styles: [require('./tournament.scss')],
	template: require('./tournament.component.html'),
})
export class AdminTournamentComponent implements OnInit {
	public options = {
		position: ["top", "center"],
		timeOut: 5000
	};

	constructor(protected _tournamentService: BaTournamentService,
				private _toastService: NotificationsService,
				private _eventService: BaEventService) {
	}

	tournaments: any;
	selectTournament: any;

	tournamentName: String;
	tournamentGame: String;
	tournamentMode: String;
	tournamentPlayMode: String;

	editTournamentId;
	editTournamentName: String;
	editTournamentGame: String;
	editTournamentMode: String;
	editTournamentPlayMode: String;
	editTournamentStatus: String;

	editGameId;
	editGameStart;
	editGameEnd;
	editGameMap;

	ngOnInit() {
		this.getTournament()
	}

	onChange(event, status, edit) {
		if (edit) {
			if (status == 'playerMode') {
				this.editTournamentPlayMode = event;
			} else if (status == 'mode') {
				this.editTournamentMode = event;
			} else if (status == 'status') {
				this.editTournamentStatus = event;
			}
		} else {
			if (status == 'playerMode') {
				this.tournamentPlayMode = event;
			} else if (status == 'mode') {
				this.tournamentMode = event;
			}
		}

	}

	onEditChange(event) {
		this.editTournamentName = event.name;
		this.editTournamentGame = event.gameName;
		this.editTournamentMode = event.mode;
		this.editTournamentPlayMode = event.playerMode;
		this.editTournamentStatus = event.status;
		this.selectTournament = event;
		console.log(event);
	}

	onGameChange(event) {
		this.editGameStart = event.start;
		this.editGameEnd = event.end;
		this.editGameMap = event.map;
	}

	getTournament() {
		this._tournamentService.getTournament().subscribe(
			// the first argument is a function which runs on success
			data => {
				this.tournaments = data.obj;
			},
			// the second argument is a function which runs on error
			err => {
				this._toastService.success(err.title, err.err.message);
			},
			// the third argument is a function which runs on completion
			() => console.log('done delete download')
		);
	}

	createTournament() {
		let size = 0;
		switch (this.tournamentMode) {
			case 'swiss':
				size = 8;
				break;
			case 'b16':
				size = 16;
				break;
			case 'b8':
				size = 8;
				break;
			case 'b4':
				size = 4;
				break;
			default:
				size = 8;
		}

		const data = {
			name: this.tournamentName,
			gameName: this.tournamentGame,
			mode: this.tournamentMode,
			size: size,
			playerMode: this.tournamentPlayMode,
			statusUser: 'kjg'
		};

		this._tournamentService.createTournament(data).subscribe(
			// the first argument is a function which runs on success
			data => {
				this._toastService.success(data.title, data.message);
				this.ngOnInit();
			},
			// the second argument is a function which runs on error
			err => {
				this._toastService.success(err.title, err.err.message);
			},
			// the third argument is a function which runs on completion
			() => console.log('done delete download')
		);
	}

	saveTournament() {
		let size = 0;
		switch (this.editTournamentMode) {
			case 'swiss':
				size = 8;
				break;
			case 'b16':
				size = 16;
				break;
			case 'b8':
				size = 8;
				break;
			case 'b4':
				size = 4;
				break;
			default:
				size = 8;
		}

		const input = {
			id: this.selectTournament._id,
			name: this.editTournamentName,
			gameName: this.editTournamentGame,
			mode: this.editTournamentMode,
			size: size,
			playerMode: this.editTournamentPlayMode,
			status: this.editTournamentStatus
		};

		if (this.selectTournament.status == this.editTournamentStatus) {
			this._tournamentService.saveTournament(input).subscribe(
				// the first argument is a function which runs on success
				data => {
					this._toastService.success(data.title, data.message);
					this.ngOnInit();
				},
				// the second argument is a function which runs on error
				err => {
					this._toastService.success(err.title, err.err.message);
				},
				// the third argument is a function which runs on completion
				() => console.log('done delete download')
			);
		} else {
			if (this.editTournamentStatus == 'on') {
				this._tournamentService.setTournamentOnline(input).subscribe(
					// the first argument is a function which runs on success
					data => {
						if (data.obj.mode == 'swiss') {
							this._tournamentService.swissCreateResult(data.obj).subscribe(
								data2 => {
									this._toastService.success(data2.title, data2.message);
									this.ngOnInit();
								},
								err => {
									console.log(err);
									this._toastService.success(err.title, err);
								},
								() => console.log('create Swiss Result')
							);
						} else {
							this._toastService.success(data.title, data.message);
							this.ngOnInit();
						}
					},
					// the second argument is a function which runs on error
					err => {
						this._toastService.success(err.title, err);
					},
					// the third argument is a function which runs on completion
					() => console.log('done delete download')
				);
			} else if (this.editTournamentStatus == 'off') {
				this._tournamentService.setTournamentOffline(input).subscribe(
					// the first argument is a function which runs on success
					data => {
						this._toastService.success(data.title, data.message);
						this.ngOnInit();
					},
					// the second argument is a function which runs on error
					err => {
						this._toastService.success(err.title, err.err.message);
					},
					// the third argument is a function which runs on completion
					() => console.log('done delete download')
				);
			} else {
				this._tournamentService.setTournamentEnd(input).subscribe(
					// the first argument is a function which runs on success
					data => {
						this._toastService.success(data.title, data.message);
						this.ngOnInit();
					},
					// the second argument is a function which runs on error
					err => {
						this._toastService.success(err.title, err.err.message);
					},
					// the third argument is a function which runs on completion
					() => console.log('done delete download')
				);
			}

		}


	}

	saveGame() {
		let voteRoom;
		let event;
		let tournament;
		const twoHours = 7200000;

		let selectGame = this.editGameId;

		if (!selectGame.voteRoom) {
			voteRoom = this.chooseRoom();
			console.log(voteRoom);
		} else {
			voteRoom = selectGame.voteRoom;
		}


		console.log(this.selectTournament);

		if (!selectGame.event) {
			event = {
				'id': false,
				'timeStart': new Date(this.editGameStart).getTime() - twoHours,
				'timeEnd': new Date(this.editGameEnd).getTime() - twoHours,
				'title': this.selectTournament.name + ' Game ' + selectGame.gameId,
				'mode': 1,
				'content': selectGame.team1 + ' vs ' + selectGame.team2,
			};
		} else {
			event = {
				'id': selectGame.event,
				'timeStart': new Date(this.editGameStart).getTime() - twoHours,
				'timeEnd': new Date(this.editGameEnd).getTime() - twoHours,
				'title': this.selectTournament.name + ' Game ' + selectGame.gameId,
				'mode': 1,
				'content': selectGame.team1 + ' vs ' + selectGame.team2,
			};
		}

		tournament = {
			'tournamentId': this.selectTournament._id,
			'gameId': this.editGameId.gameId,
			'timeStart': new Date(this.editGameStart).getTime() - twoHours,
			'timeEnd': new Date(this.editGameEnd).getTime() - twoHours,
			'map': this.editGameMap,
			'voteRoom': voteRoom,
			'event': event
		};

		this._eventService.tournament(tournament.event).subscribe(
			data => {
				tournament.event = data.obj;
				this._tournamentService.patchGameInfo(tournament).subscribe(
					data2 => {
						this._toastService.success(data2.title, data2.message);
						this.ngOnInit();
					},
					error2 => {
						console.error(error2);
					}
				)
			},
			error => {
				console.error(error);
			}
		);


	};

	delTournament() {
		let id = this.selectTournament._id;

		if (confirm("Willst du wirklich das Turnier löschen?")) {
			this._tournamentService.delTournament(id).subscribe(
				data => {
					this._toastService.success(data.title, data.message);
					this.editTournamentName = null;
					this.ngOnInit();
				}
			);
		}
	};

	chooseRoom() {
		let voteRoom;
		let rooms = [];

		for (let game of this.selectTournament.games) {
			rooms.push(game.voteRoom);
		}

		voteRoom = Math.floor(Math.random() * (9999 - 1000)) + 1000;

		if (rooms.indexOf(voteRoom)) {
			return voteRoom;
		} else {
			this.chooseRoom();
		}

	}


}
