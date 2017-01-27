import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class BaClanService{
    constructor(private http: Http) {
    }
    newData = new EventEmitter();

    newClanList(data){
        console.log(data);
        this.newData.emit(data);
    }

    /** create an clan**/
    creatClan(clan): Observable<any> {
        const body = JSON.stringify(clan);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        console.log(body);
        return this.http.post('/api/reg/clan', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    /** get all clans **/
    getClanList(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.get('/api/reg/clan', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    /** edit one clan **/
    editClan(clan): Observable<any> {

        const body = JSON.stringify(clan);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        console.log(body);
        return this.http.post('/api/reg/clan/edit', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    /** clan go out **/
    clanOut(clan): Observable<any> {

        const body = JSON.stringify(clan);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        console.log(body);
        return this.http.post('/api/reg/clan/out', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    /** clan go in **/
    clanIn(clan): Observable<any> {

        const body = JSON.stringify(clan);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        /*console.log(body);*/
        return this.http.post('/api/reg/clan/in', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    /** delete clan **/
    clanDel(clan): Observable<any> {

        const body = JSON.stringify(clan);
        console.log(body);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        console.log(body);
        return this.http.post('/api/reg/clan/del', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

}
