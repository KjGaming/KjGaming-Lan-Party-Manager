import { Component, OnInit } from '@angular/core';
import { BaServerService } from "../../theme/services/baServer/baServer.service";
import { BaTournamentService } from "app/theme/services/baTournament";
import { BaEventService } from "app/theme/services/baEvent";
import { NotificationsService } from "angular2-notifications";


@Component({
	selector: 'download',
	styles: [require('./tCreat.scss')],
	template: require('./tCreat.component.html')
})


export class TCreateComponent implements OnInit {
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
		this._tournamentService.getUserTournament().subscribe(
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
			playerMode: this.tournamentPlayMode
		};

		this._tournamentService.createUserTournament(data).subscribe(
			// the first argument is a function which runs on success
			data => {
				this._toastService.success(data.title, data.message);
				this.ngOnInit();
			},
			// the second argument is a function which runs on error
			err => {
				this._toastService.success(err.title, err.err.message);
			}
		);
	}

	saveTournament() {
		let size = 0;
		switch (this.editTournamentMode) {
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
		let tournament;
		const twoHours = 7200000;

		tournament = {
			'tournamentId': this.selectTournament._id,
			'gameId': this.editGameId.gameId,
			'timeStart': new Date(this.editGameStart).getTime() - twoHours,
			'timeEnd': new Date(this.editGameEnd).getTime() - twoHours,
			'map': this.editGameMap,
			'event': 0,
			'voteRoom': 0
		};

		this._tournamentService.patchGameInfo(tournament).subscribe(
			data => {
				this._toastService.success(data.title, data.message);
				this.ngOnInit();
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

}
