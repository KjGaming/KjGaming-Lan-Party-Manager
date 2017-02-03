import { Component, OnInit } from '@angular/core';
import { TournamentService } from "./tournament.service";


@Component({
    selector: 'tournament',
    styles: [require('./tournament.scss')],
    template: require('./tournament.component.html')
})


export class TournamentComponent implements OnInit {
    public tournaments;


    constructor(private _tournamentService: TournamentService) {
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

    openAlert(tournamentData){
        alert(tournamentData);
    }

    statusChange(status, mode){
        if(mode == 'text'){
            switch(status){
                case 'on':
                    return 'Live';
                case 'off':
                    return 'OFF';
                case 'reg':
                    return 'Registration';
                case 'end':
                    return 'End';
            }
        }else{
            switch(status){
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

    imgChange(statusUser, game){
        if(statusUser == 'user'){
            return {'background-image': 'url(/assets/img/t-user.jpg)'};
        }else{
            if(game == 'Counter Strike : Global Offensive'){
                return {'background-image': 'url(/assets/img/t-csgo.jpg)'};
            }else if(game == 'League of Legends'){
                return {'background-image': 'url(/assets/img/t-lol.jpg)'};
            }else if(game == 'Trackmania Nation'){
                return {'background-image': 'url(/assets/img/t-track.jpg)'};
            }else{
                return {'background-image': 'url(/assets/img/t-user.jpg)'};
            }
        }
    }

    tRegUser(tournament){
        if(tournament.playerMode == 'Clan'){
            return tournament.clan.length;
        }else{
            return tournament.player.length;
        }
    }

    chooseMode(tournament, mode){
        if(mode == 'router'){
            console.log(tournament);
            if(tournament.status == 'off'){
                return 'register'
            }else if(tournament.status == 'on'){
                return tournament
            }else{
                return 'end'
            }
        }else{
            if(tournament.status == 'off'){
                return 'Anmelden'
            }else if(tournament.status == 'on'){
                return 'zum Turnier'
            }else{
                return 'Ergebnis'
            }
        }
    }
}
