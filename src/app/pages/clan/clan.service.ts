import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class ClanService {

    constructor(private http: Http) {

    }


    getClanList(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.get('/api/clan', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });
    }

    editClan(clan): Observable<any> {

        const body = JSON.stringify(clan);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        console.log(body);
        return this.http.post('/api/clan/edit', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    creatClan(clan): Observable<any> {

        const body = JSON.stringify(clan);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        console.log(body);
        return this.http.post('/api/clan/creat', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    clanOut(clan): Observable<any> {

        const body = JSON.stringify(clan);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        console.log(body);
        return this.http.post('/api/clan/out', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    clanIn(clan): Observable<any> {

        const body = JSON.stringify(clan);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        /*console.log(body);*/
        return this.http.post('/api/clan/in', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    clanDel(clan): Observable<any> {

        const body = JSON.stringify(clan);
        console.log(body);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        console.log(body);
        return this.http.post('/api/clan/del', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

}
