import { Component, OnInit } from '@angular/core';
import { TournamentService } from "./tournament.service";
import { User } from "../../theme/model";


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
}
