import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {SmartTablesService} from './smartTables.service';
import {TournamentService} from "../../tournament.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {NotificationsService} from "angular2-notifications/src/notifications.service";

@Component({
    selector: 'ende',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./end.scss')],
    template: require('./end.component.html')
})
export class TournamentEndComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    ngOnInit(){

    }

}
