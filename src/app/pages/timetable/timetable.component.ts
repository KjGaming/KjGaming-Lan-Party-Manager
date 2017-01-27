import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationsService } from "angular2-notifications/src/notifications.service";
import {BaEventService} from "../../theme/services/baEvent/baEvent.service";


@Component({
    selector: 'timetable',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./timetable.scss')],
    template: require('./timetable.component.html')
})


export class TimetableComponent implements OnInit {
    public listDays: any[] = [];
    public events;
    eventTime = null;
    watch = null;

    constructor(private _timeService: BaEventService, private _toastService: NotificationsService) {
    }

    ngOnInit() {
        this.listDays = [];
        this.getEvents();
    }

    sortEvent(events) {
        for (let event of events) {
            var eventTime = new Date(+event.timeStart);


            if ((((event.timeEnd - event.timeStart) / (60 * 1000)) % 60) < 10) {
                event['durationMin'] = '0' + ((event.timeEnd - event.timeStart) / (60 * 1000)) % 60;
            }else{
                event['durationMin'] = ((event.timeEnd - event.timeStart) / (60 * 1000)) % 60;
            }


            event['durationHour'] = ((event.timeEnd - event.timeStart) / (60 * 60 * 1000));



            if (eventTime.getHours() < 10) {
                event['timeHour'] = '0' + eventTime.getHours();
            } else {
                event['timeHour'] = '' + eventTime.getHours();
            }

            if (eventTime.getMinutes() < 10) {
                event['timeMinits'] = '0' + eventTime.getMinutes();
            } else {
                event['timeMinits'] = '' + eventTime.getMinutes();
            }


            if (this.listDays.length != 0) {
                var isDayInList: boolean = true;
                for (let index in this.listDays) {
                    if (eventTime.getDate() == this.listDays[index].day) {
                        if (eventTime.getMonth() == this.listDays[index].month) {
                            if (eventTime.getFullYear() == this.listDays[index].year) {
                                isDayInList = false;
                                this.listDays[index].events.push(event);
                                break;
                            }
                        }
                    }
                }
                if (isDayInList === true) {
                    if (eventTime.getHours() == 0 && eventTime.getMinutes() == 0 && eventTime.getSeconds() == 0) {
                        var dayTime = this.getDayName(eventTime.getUTCDay() + 1);
                    } else {
                        var dayTime = this.getDayName(eventTime.getUTCDay());
                    }

                    this.listDays.push({
                        'day': eventTime.getDate(),
                        'month': eventTime.getMonth(),
                        'year': eventTime.getFullYear(),
                        'dayName': dayTime,
                        'events': []
                    });
                    this.listDays[this.listDays.length - 1].events.push(event);
                }
            } else {
                if (eventTime.getHours() == 0 && eventTime.getMinutes() == 0 && eventTime.getSeconds() == 0) {
                    var dayTime = this.getDayName(eventTime.getUTCDay() + 1);
                } else {
                    var dayTime = this.getDayName(eventTime.getUTCDay());
                }
                this.listDays[0] = {
                    'day': eventTime.getDate(),
                    'month': eventTime.getMonth(),
                    'year': eventTime.getFullYear(),
                    'dayName': dayTime,
                    'events': []
                };
                this.listDays[0].events.push(event);
            }

            console.log(this.listDays);
        }
        //Sort the date
        this.listDays.sort(this._timeService.sortDay);

        //Sort the events
        for (let days of this.listDays) {
            days.events.sort(this._timeService.sortTime);
        }


    };

    getDayName(dayNumber) {
        var dayName;
        switch (dayNumber) {
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

    watchDay(hour, minits) {
        if(this.eventTime){
            if(this.eventTime == hour +':'+ minits){
                this.watch = true;
                return false;
            }else{
                this.eventTime = hour +':'+ minits;
                this.watch = false;
                return true;
            }
        }else{
            this.eventTime = hour +':'+ minits;
            this.watch = false;
            return true;
        }
    }

    getEvents() {
        this._timeService.get().subscribe(
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
            () => console.log('loading baEvent')
        );
    }

}
