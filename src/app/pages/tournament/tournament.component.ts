import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs4-modal/components/modal";
import { BaTournamentService } from "../../theme/services/baTournament/baTournament.service";
import { BaClanService } from "../../theme/services/baClan/baClan.service";
import { NotificationsService } from "../../../../node_modules/angular2-notifications/src/notifications.service";


@Component({
	selector: 'tournament',
	styles: [require('./tournament.scss')],
	template: require('./tournament.component.html')
})


export class TournamentComponent implements OnInit {
	public options = {
		position: ["top", "center"],
		timeOut: 5000
	};

	public tournaments;
	focusTournament = '';
	userClans = [];

	@ViewChild('register') register: ModalComponent;


	constructor(private _tournamentService: BaTournamentService, private _clanService: BaClanService, private _toastService: NotificationsService) {
	}

	ngOnInit() {
		this.getTournament();

	}

	getTournament() {
		this._tournamentService.getTournament().subscribe(
			// the first argument is a function which runs on success
			data => {
				this.tournaments = data.obj;
				console.log(this.tournaments);
				/* console.log(this.tournaments);*/
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done loading news')
		);
	}

	openAlert(tournamentData) {
		alert(tournamentData);
	}

	statusChange(status, mode) {
		if (mode == 'text') {
			switch (status) {
				case 'on':
					return 'Live';
				case 'off':
					return 'OFF';
				case 'reg':
					return 'Registration';
				case 'end':
					return 'End';
			}
		} else {
			switch (status) {
				case 'on':
					return 'statusOn';
				case 'off':
					return 'statusOff';
				case 'reg':
					return 'statusReg';
				case 'end':
					return 'statusEnd';
			}
		}

	}

	imgChange(statusUser, game) {
		if (statusUser == 'user') {
			return {'background-image': 'url(/assets/img/t-user.jpg)'};
		} else {
			if (game == 'Counter Strike : Global Offensive') {
				return {'background-image': 'url(/assets/img/t-csgo.jpg)'};
			} else if (game == 'League of Legends') {
				return {'background-image': 'url(/assets/img/t-lol.jpg)'};
			} else if (game == 'Trackmania Nation') {
				return {'background-image': 'url(/assets/img/t-track.jpg)'};
			} else {
				return {'background-image': 'url(/assets/img/t-user.jpg)'};
			}
		}
	}

	tRegUser(tournament) {
		if (tournament.playerMode == 'Clan') {
			return tournament.clan.length;
		} else {
			return tournament.player.length;
		}
	}

	chooseMode(tournament, mode) {
		if (mode == 'router') {
			/*console.log(tournament);*/
			if (tournament.status == 'off') {
				return 'register'
			} else if (tournament.status == 'on') {
				return tournament.mode
			} else {
				return 'end'
			}
		} else {
			if (tournament.status == 'off') {
				return 'Anmelden'
			} else if (tournament.status == 'on') {
				return 'zum Turnier'
			} else {
				return 'Ergebnis'
			}
		}
	}

	openRegister(tournament) {
		let userId = localStorage.getItem('userId');
		let userClans = JSON.parse(localStorage.getItem('clans'));
		this.userClans = userClans;
		tournament.regInTournament = 0;

		if (tournament.playerMode == 'Clan') {
			for (let focusClan of tournament.clan) {
				for (let clan of userClans) {
					if (clan._id == focusClan) {
						tournament.inTournament = true;
						break;
					} else {
						tournament.inTournament = false;
					}
				}
			}
			if (tournament.clan.length == 0) {
				tournament.inTournament = false;
			}
		} else {
			console.log(userId);
			console.log(tournament);

			if (tournament.player.length <= 0) {
				tournament.inTournament = false;
				tournament.regInTournament = 1;
			}

			for (let player of tournament.player) {
				console.log(userId);
				console.log(player);
				if (userId == player) {
					tournament.inTournament = true;
					tournament.regInTournament = 2;
					break;
				} else {
					tournament.inTournament = false;
					tournament.regInTournament = 1;
				}
			}
		}


		/* console.log(tournament);*/
		this.focusTournament = tournament;
		this.register.open();
	}

	saveRegister(tournament) {
		console.log(tournament);

		let regEvent = {
			mode: tournament.playerMode,
			id: tournament._id,
			clanId: tournament.newClanId,
			userId: localStorage.getItem('userId')
		};

		this._tournamentService.registration(regEvent).subscribe(
			// the first argument is a function which runs on success
			data => {
				this._toastService.success(data.title, data.message);
				this.register.close();
				this.ngOnInit();
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('reg Clan')
		);
	}

	delRegister(tournament) {
		let regEvent = {
			mode: tournament.playerMode,
			id: tournament._id,
			clanId: tournament.newClanId,
			userId: localStorage.getItem('userId')
		};

		this._tournamentService.registrationDelete(regEvent).subscribe(
			// the first argument is a function which runs on success
			data => {
				this._toastService.success(data.title, data.message);
				this.register.close();
				this.ngOnInit();
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('reg Clan')
		);
	}

	checkClanStatus(tournament, event) {
		let focusClanId = event.target.value;
		let allClans = null;
		tournament.regInTournament = 0;
		console.log(focusClanId);

		if (focusClanId != 'empty') {
			tournament.regInTournament = 1;
			this._clanService.getClanList().subscribe(
				// the first argument is a function which runs on success
				data => {
					allClans = data.obj;
					for (let tClan of tournament.clan) {
						if (tClan == focusClanId) {
							for (let clan of allClans) {
								if (focusClanId == clan._id && clan.admin._id == localStorage.getItem('userId')) {
									tournament.regInTournament = 2;
									break;
								} else {
									tournament.regInTournament = 3;
								}
							}
							break;
						} else {
							for (let clan of allClans) {
								if (focusClanId == clan._id && clan.admin._id == localStorage.getItem('userId')) {
									tournament.regInTournament = 1;
									break;
								} else {
									tournament.regInTournament = 3;
								}
							}
						}
					}
					tournament.newClanId = focusClanId;
					this.focusTournament = tournament;
				},
				// the second argument is a function which runs on error
				err => console.error(err)
			);
		}
	}
}
