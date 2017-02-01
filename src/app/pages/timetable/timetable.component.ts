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

    getEvents() {
        this._timeService.get().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.events = data.obj;
                this.sortEvent(data.obj);
                /* console.log(this.events);*/

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

    sortEvent(events) {


        for (let event of events) {

            let eventTime = new Date(+event.timeStart);
            let timeChange = 60;
            let timeDurationMin = (event.timeDuration / (60 * 1000)) % timeChange;
            let timeDurationHour = Math.floor(event.timeDuration / (60*60*1000) % 24);
            let dayTime;
            let isDayInList: boolean = false;


            console.log(timeDurationHour);
            /** calculate the minits duration from the duration time**/
            if(timeDurationMin < 10){
                event['durationMin'] = '0' + timeDurationMin;
            }else {
                event['durationMin'] = timeDurationMin;
            }

            /** calculate the hours duration from the duration time**/
            if(timeDurationHour < 10){
                event['durationHour'] = '0' + timeDurationHour;
            }else {
                event['durationHour'] = timeDurationHour;
            }

            /** calculate the hours from the time**/
            if (eventTime.getHours() < 10) {
                event['timeHour'] = '0' + eventTime.getHours();
            } else {
                event['timeHour'] = '' + eventTime.getHours();
            }

            /** calculate the minits from the time**/
            if (eventTime.getMinutes() < 10) {
                event['timeMinits'] = '0' + eventTime.getMinutes();
            } else {
                event['timeMinits'] = '' + eventTime.getMinutes();
            }

            /** If there a day in the list array**/
            if (this.listDays.length != 0) {

                /** If the same date exist, it push to the array **/
                for (let index in this.listDays) {
                    if (eventTime.getDate() == this.listDays[index].day) {
                        if (eventTime.getMonth() == this.listDays[index].month) {
                            if (eventTime.getFullYear() == this.listDays[index].year) {
                                isDayInList = true;
                                this.listDays[index].events.push(event);
                                break;
                            }
                        }
                    }
                }

                /** Set a new date to the listDays array **/
                if (isDayInList === false) {
                    if (eventTime.getHours() == 0 && eventTime.getMinutes() == 0 && eventTime.getSeconds() == 0) {
                        dayTime = this.getDayName(eventTime.getUTCDay() + 1);
                    } else {
                        dayTime = this.getDayName(eventTime.getUTCDay());
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
                    dayTime = this.getDayName(eventTime.getUTCDay() + 1);
                } else {
                    dayTime = this.getDayName(eventTime.getUTCDay());
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


    }

    getDayName(dayNumber):string {
        var dayName;
        switch (dayNumber) {
            case 1:
                return dayName = 'Montag';
            case 2:
                return dayName = 'Dienstag';
            case 3:
                return dayName = 'Mittwoch';
            case 4:
                return dayName = 'Donnerstag';
            case 5:
                return dayName = 'Freitag';
            case 6:
                return dayName = 'Samstag';
            case 0:
                return dayName = 'Sonntag';
        }
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



}
