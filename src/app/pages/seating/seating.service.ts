import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { NotificationsService } from "angular2-notifications/src/notifications.service";

@Injectable()
export class SeatingService {

    constructor(private http: Http, private _toastService: NotificationsService) {
    }

    // Uses http.get() to load a single JSON file
    getSeat(): Observable<any> {
        const token = localStorage.getItem('id_token')
            ? '?id_token=' + localStorage.getItem('id_token')
            : '';
        return this.http.get('/api/user/seat' + token)
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                this._toastService.error('test', 'test');
                return Observable.throw(err.json());
            });

    }

    postSeat(id:number): Observable<any> {
        const seat = {
            seat: id,
            id: localStorage.getItem('userId')
        };
        const body = seat;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.post('/api/user/seat', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                this._toastService.error('Test', 'test');
                return Observable.throw(err.json);
            });

    }
}

