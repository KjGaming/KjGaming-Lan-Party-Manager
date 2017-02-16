import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs4-modal/components/modal";
import {SmartTablesService} from './smartTables.service';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {BaTournamentService} from "../../../../theme/services/baTournament/baTournament.service";
import {BaClanService} from "../../../../theme/services/baClan/baClan.service";

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

    swissSubscriber: number = 16;
    swissResult = [2, 1, 0, 2, 3, 4, 5, 1];
    swissResultTable = [
        {
            'name': 'Team1',
            'win': 2,
            'loose': 1,
            'points': 1.5,
            'qualified': 0
        },
        {
            'name': 'Team2',
            'win': 0,
            'loose': 0,
            'points': 0,
            'qualified': 0
        },
        {
            'name': 'Team3',
            'win': 1,
            'loose': 0,
            'points': 1,
            'qualified': 0
        },
        {
            'name': 'Team4',
            'win': 2,
            'loose': 0,
            'points': 2,
            'qualified': 0
        },
        {
            'name': 'Team5',
            'win': 1,
            'loose': 1,
            'points': 0.5,
            'qualified': 0
        },
        {
            'name': 'Team6',
            'win': 0,
            'loose': 0,
            'points': 0,
            'qualified': 0
        },
        {
            'name': 'Team7',
            'win': 1,
            'loose': 2,
            'points': 0,
            'qualified': 0
        },
        {
            'name': 'Team8',
            'win': 0,
            'loose': 2,
            'points': -1,
            'qualified': 0
        }

    ];
    swissRound: Object = ['Runde 1', 'Runde 2', 'Runde 3'];
    swissMatch: Object = {
        "Runde 1": [
            {
                "team1": "Team 1",
                "team2": "ORGA",
                "result": "0:0",
                "result1": 0,
                "result2": 0,
                "rounds": "0-0",
                "game": 1
            },
            {
                "team1": "Team 3",
                "team2": "Team 4",
                "result": "0:0",
                "result1": 0,
                "result2": 0,
                "rounds": "0-0",
                "game": 2
            },
            {
                "team1": "Team 5",
                "team2": "Team 6",
                "result": "0:0",
                "result1": 0,
                "result2": 0,
                "rounds": "0-0",
                "game": 3
            },
            {
                "team1": "Team 7",
                "team2": "Team 8",
                "result": "0:0",
                "result1": 0,
                "result2": 0,
                "rounds": "0-0",
                "game": 4
            }
        ],
        "Runde 2": [],
        "Runde 3": [],
        "Runde 5": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 11
        },
        "Runde 6": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 12
        },
        "Runde 7": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 13
        },
        "Runde 8": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 14
        },
        "Runde 9": {
            "team1": "Team 7",
            "team2": "Team 8",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 15
        },
        "Runde 10": {
            "team1": "LALA",
            "team2": "LOPLOP",
            "result1": 0,
            "result2": 0,
            "result": "0:0",
            "rounds": "0-0",
            "game": 16
        }


    };
    selectMatch = {};
    userClanName = [];
    userAdminId = '';


    tournament; // The whole tournament
    tournamentId; // The tournament ID
    public games = []; // All Games in this tournament


    //Variable for input the Value
    userStatus = localStorage.getItem('blackWidow');

    public resultForm: FormGroup;

    constructor(private _tournamentService: BaTournamentService,
                private route: ActivatedRoute,
                public fb: FormBuilder,
                private _toastService: NotificationsService,
                private _clanService: BaClanService) {
        this.route.params.subscribe(params => {
            this.tournamentId = params['tournamentId'];
        });
    }

    ngOnInit() {
        this.getTournament(this.tournamentId);
        this.userAdminId = localStorage.getItem('blackWidow');
        this.getUserClanName();
        console.log(this.swissMatch);
    }

    getTournament(id) {
        this._tournamentService.getTournamentInfos(id).subscribe(
            // the first argument is a function which runs on success
            data => {
                this.tournament = data.obj;
                this.games = data.obj.games;
                console.log(data);
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }

    getUserClanName() {
        this._clanService.getClanList().subscribe(
            // the first argument is a function which runs on success
            data => {
                for (let key in data.obj) {
                    this.userClanName[key] = data.obj[key].name;
                }
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('loading clan')
        );
    }

    openMatchInfo(match) {
        let splitResult;

        for (let userClan of this.userClanName) {
            if (userClan == match.team1 || userClan == match.team2) {
                match["isInClan"] = true;
                break;
            } else {
                match["isInClan"] = false;
            }
        }


        splitResult = match.result.split(":");
        match["resultT1"] = splitResult[0];
        match["resultT2"] = splitResult[1];

        this.match.open();
        this.selectMatch = match;
        console.log(this.selectMatch);
    }

    whoIsWinner(match, team) {
        if (match.result1 || match.result2) {
            if (team == "team1") {
                if (match.res1 > match.res2) {
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
        }else{
            return {'winner': false};
        }
    }

}
