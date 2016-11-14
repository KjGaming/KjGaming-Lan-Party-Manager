import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {NotificationsService} from "angular2-notifications/src/notifications.service";

@Injectable()
export class TimetableService {

    constructor(private http: Http, private _toastService: NotificationsService) {
    }

    // Uses http.get() to load a single JSON file
    getNews(): Observable<any> {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('/api/user' + token)
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                this._toastService.error('test', 'test');
                return Observable.throw(err.json());
            });

    }
}

