import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs4-modal/components/modal";
import {SmartTablesService} from './smartTables.service';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {BaTournamentService} from "../../../../theme/services/baTournament/baTournament.service";

@Component({
    selector: 'swiss',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./swiss.scss')],
    template: require('./swiss.component.html')
})
export class SwissComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    @ViewChild('match') match: ModalComponent;

    swissSubscriber:number  = 16;
    swissRound:Object  = ['Runde 1','Runde 2','Runde 3','Runde 4','Runde 5'];
    swissMatch:Object = {
        "Runde 1":[
            {
                "team1": "Team 1",
                "team2": "Team 2",
                "result": "0:0",
                "rounds": "0-0",
            },
            {
                "team1": "Team 3",
                "team2": "Team 4",
                "result": "0:0",
                "rounds": "0-0",
            },
            {
                "team1": "Team 5",
                "team2": "Team 6",
                "result": "0:0",
                "rounds": "0-0",
            },
            {
                "team1": "Team 7",
                "team2": "Team 8",
                "result": "0:0",
                "rounds": "0-0",
            },
            {
                "team1": "Team 9",
                "team2": "Team 10",
                "result": "0:0",
                "rounds": "0-0",
            },
            {
                "team1": "Team 11",
                "team2": "Team 12",
                "result": "0:0",
                "rounds": "0-0",
            },
            {
                "team1": "Team 13",
                "team2": "Team 14",
                "result": "0:0",
                "rounds": "0-0",
            },
            {
                "team1": "Team 15",
                "team2": "Team 16",
                "result": "0:0",
                "rounds": "0-0",
            }
        ],
        "Runde 2":[],
        "Runde 3":[],
        "Runde 4":[],
        "Runde 5":[]

    };


    tournament; // The whole tournament
    tournamentId; // The tournament ID
    public games = []; // All Games in this tournament


    //Variable for input the Value
    userStatus = localStorage.getItem('blackWidow');

    public resultForm: FormGroup;

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
        console.log(this.swissMatch);
    }

    getTournament(id) {
        this._tournamentService.getTournamentInfos(id).subscribe(
            // the first argument is a function which runs on success
            data => {
                this.tournament = data.obj;
                this.games = data.obj.games;


            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }

    openMatchInfo(match){
        this.match.open();
    }

}
