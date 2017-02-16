import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {BaServerService} from "../../../../theme/services/baServer/baServer.service";
import {BaTournamentService} from "../../../../theme/services/baTournament/baTournament.service";

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

    constructor(protected _tournamentService: BaTournamentService, private _toastService: NotificationsService) {
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

    ngOnInit() {
        this.getTournament()
    }

    onChange(event, status, edit) {
        if(edit){
            if (status == 'playerMode') {
                this.editTournamentPlayMode = event;
            } else if (status == 'mode') {
                this.editTournamentMode = event;
            }else if(status == 'status'){
                this.editTournamentStatus = event;
            }
        }else{
            if (status == 'playerMode') {
                this.tournamentPlayMode = event;
            } else if (status == 'mode') {
                this.tournamentMode = event;
            }
        }

    }

    onEditChange(event){
        this.editTournamentName = event.name;
        this.editTournamentGame = event.gameName;
        this.editTournamentMode = event.mode;
        this.editTournamentPlayMode = event.playerMode;
        this.editTournamentStatus = event.status;
        this.selectTournament = event;
        console.log(event);
    }

    getTournament(){
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
        switch(this.tournamentMode){
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
            gameName:this.tournamentGame,
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

    saveTournament(){
        let size = 0;
        switch(this.editTournamentMode){
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
            id : this.selectTournament._id,
            name: this.editTournamentName,
            gameName:this.editTournamentGame,
            mode: this.editTournamentMode,
            size: size,
            playerMode: this.editTournamentPlayMode,
            status : this.editTournamentStatus
        };

        if(this.editTournamentStatus == 'on'){
            this._tournamentService.setTournamentOnline(data).subscribe(
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
        }else if(this.editTournamentStatus == 'off'){
            this._tournamentService.setTournamentOffline(data).subscribe(
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
        }else{
            this._tournamentService.setTournamentEnd(data).subscribe(
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

    delTournament(){

    }
}
