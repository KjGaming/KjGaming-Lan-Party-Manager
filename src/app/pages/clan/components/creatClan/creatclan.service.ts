import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class CreatClanService {
    constructor(private http: Http) {}

    // Uses http.get() to load a single JSON file
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
}
