import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BaEventService {

    constructor(private http: Http) {
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

    /** get all events **/
    get(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/reg/event', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    /** create a new event **/
    create(data){
        const body = JSON.stringify(data);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.post('/api/admin/event', body ,{headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    /** delete the current event **/
    del(data){
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.delete('/api/admin/event/' + data.id, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

}