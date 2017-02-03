import {Component, OnInit, ViewChild} from '@angular/core';
import {BaTournamentService} from "../../theme/services/baTournament/baTournament.service";
import {ModalComponent} from "ng2-bs4-modal/components/modal";


@Component({
    selector: 'tournament',
    styles: [require('./tournament.scss')],
    template: require('./tournament.component.html')
})


export class TournamentComponent implements OnInit {
    public tournaments;
    focusTournament = '';
    userClans = [];
    public choosenUserClan;

    @ViewChild('register') register: ModalComponent;


    constructor(private _tournamentService: BaTournamentService) {
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
            console.log(tournament);
            if (tournament.status == 'off') {
                return 'register'
            } else if (tournament.status == 'on') {
                return tournament
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
            for (let player of tournament.player) {
                if (userId == player.id) {
                    tournament.inTournament = true;
                    break;
                } else {
                    tournament.inTournament = false;
                }
            }
        }


        console.log(tournament);
        this.focusTournament = tournament;
        this.register.open();
    }

    saveRegister(tournament) {
        this.register.close();
    }

    checkClanStatus(tournament, event) {
        let clanId = event.target.value;

        for (let focusClan of tournament.clan) {
            if (clanId == focusClan) {
                tournament.inTournament = true;
                break;
            } else {
                tournament.inTournament = false;
            }
        }
        this.focusTournament = tournament;
    }
}
