import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { ErrorService } from "../../theme/components/errors/error.service";

@Injectable()
export class TournamentService {

    constructor(private http: Http) {
    }

    // Uses http.get() to load a single JSON file
    getTournament(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/tournament', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    getTournamentInfos(id): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')

        });

        return this.http.get('/api/tournament/selected?id='+ id, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });
    }

    postTournamentResult(event): Observable<any> {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.post('/api/tournament/saveResult', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

}

