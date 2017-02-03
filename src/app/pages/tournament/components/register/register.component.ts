import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {SmartTablesService} from './smartTables.service';
import {NotificationsService} from "angular2-notifications/src/notifications.service";

@Component({
    selector: 'register',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./register.scss')],
    template: require('./register.component.html')
})
export class TournamentRegisterComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };



    ngOnInit(){

    }

}
