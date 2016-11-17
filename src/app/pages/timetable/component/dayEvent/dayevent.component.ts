import {Component, OnInit} from '@angular/core';
import {TimetableComponent} from "../../timetable.component";


@Component({
    selector: 'eventTable',
    template: require('./dayevent.component.html')
})

export class dayeventComponent implements OnInit{


    constructor(private _timetable: TimetableComponent) {
    }

    ngOnInit() {

        //this._timetable.events;
    }

}
