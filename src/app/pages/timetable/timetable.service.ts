import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {NotificationsService} from "angular2-notifications/src/notifications.service";

@Injectable()
export class TimetableService {

    constructor(private http: Http, private _toastService: NotificationsService) {
    }

    sortDay(a,b){
        if (a.day < b.day && a.month <= b.month && a.year <= b.year)
            return -1;
        if (a.day > b.day && a.month >= b.month && a.year >= b.year)
            return 1;
        return 0;
    }

    sortTime(a,b){
        if (a.timeStart < b.timeStart)
            return -1;
        if (a.timeStart > b.timeStart)
            return 1;
        return 0;
    }

    // Uses http.get() to load a single JSON file
    getEvent(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/event', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }
    creatEvent(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/reg', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }
}

