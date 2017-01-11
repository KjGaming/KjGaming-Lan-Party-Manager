import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MemberlistService {

    constructor(private http: Http) {
    }

    // Uses http.get() to load a single JSON file
    getUserMemberlist(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/user', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }
}

