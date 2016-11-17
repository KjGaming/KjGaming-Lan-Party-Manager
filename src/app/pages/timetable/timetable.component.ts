import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TimetableService} from "./timetable.service";
import {NotificationsService} from "angular2-notifications/src/notifications.service";


@Component({
    selector: 'timetable',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./timetable.scss')],
    template: require('./timetable.component.html')
})


export class TimetableComponent implements OnInit {
    public listDays: any[] = [];

    public events;


    constructor(private _timeService: TimetableService, private _toastService: NotificationsService) {
    }

    ngOnInit() {
        this.listDays = [];
        this.getEvents();
    }

    sortEvent(events) {
        for (let event of events) {
            var eventTime = new Date(event.timeStart * 1000);

            if (this.listDays.length != 0) {
                var isDayInList: boolean = true;
                for (let index in this.listDays) {
                    if (eventTime.getDate() == this.listDays[index].day) {
                        if(eventTime.getMonth() == this.listDays[index].month){
                            if(eventTime.getFullYear() == this.listDays[index].year){
                                isDayInList = false;
                                this.listDays[index].events.push(event);
                                break;
                            }
                        }
                    }
                }
                if(isDayInList === true){
                    var dayTime = this.getDayName(eventTime.getUTCDay());
                    this.listDays.push({
                        'day': eventTime.getDate(),
                        'month': eventTime.getMonth(),
                        'year': eventTime.getFullYear(),
                        'dayName': dayTime,
                        'events':[]
                    });
                    this.listDays[this.listDays.length - 1].events.push(event);
                }
            } else {
                var dayTime = this.getDayName(eventTime.getUTCDay());
                this.listDays[0] = {
                    'day': eventTime.getDate(),
                    'month': eventTime.getMonth(),
                    'year': eventTime.getFullYear(),
                    'dayName': dayTime,
                    'events':[]
                };
                this.listDays[0].events.push(event);
            }

            console.log(this.listDays);
        }

    };

    getDayName(dayNumber){
        var dayName;
        switch (dayNumber){
            case 1:
                dayName = 'Montag';
                break;
            case 2:
                dayName = 'Dienstag';
                break;
            case 3:
                dayName = 'Mittwoch';
                break;
            case 4:
                dayName = 'Donnerstag';
                break;
            case 5:
                dayName = 'Freitag';
                break;
            case 6:
                dayName = 'Samstag';
                break;
            case 0:
                dayName = 'Sonntag';
                break;
        }
        return dayName;
    }


    getEvents() {
        this._timeService.getEvent().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.sortEvent(data.obj);
                this.events = data.obj;
                console.log(this.events);

            },
            // the second argument is a function which runs on error
            error => {
                this._toastService.error(error.title, error.error.message);
                console.error(error);
            },
            // the third argument is a function which runs on completion
            () => console.log('loading event')
        );
    }

    creatEvent() {
        this._timeService.creatEvent().subscribe(
            // the first argument is a function which runs on success
            data => {

            },
            // the second argument is a function which runs on error
            error => {
                this._toastService.error(error.title, error.error.message);
                console.error(error);
            },
            // the third argument is a function which runs on completion
            () => console.log('creat event')
        );
    }
}
