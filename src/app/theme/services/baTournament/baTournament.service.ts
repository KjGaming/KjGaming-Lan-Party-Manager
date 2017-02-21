import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {ErrorService} from "../../theme/components/errors/error.service";

@Injectable()
export class BaTournamentService {

    constructor(private http: Http) {
    }

    // Uses http.get() to load a single JSON file
    getTournament(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/reg/tournament', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    getTournamentInfos(id): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')

        });

        return this.http.get('/api/reg/tournament/selected?id=' + id, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    postTournamentResult(event): Observable<any> {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.post('/api/reg/tournament/saveResult', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    registration(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.put('/api/reg/tournament/registration', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    registrationDelete(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.post('/api/reg/tournament/registration', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    createTournament(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.post('/api/reg/tournament/create', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    saveTournament(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.put('/api/reg/tournament/save', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    setTournamentOnline(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.put('/api/reg/tournament/createGames', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    setTournamentOffline(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.put('/api/reg/tournament/offline', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    setTournamentEnd(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.post('/api/reg/tournament/endTournament', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    saveGameResult(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        console.log(body);

        return this.http.put('/api/reg/tournament/game/save', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    /** Swiss System **/
    swissCreateResult(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        console.log(body);

        return this.http.post('/api/reg/tournament/swiss/createResult', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    swissSaveResult(event) {
        const body = JSON.stringify(event);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        console.log(body);

        return this.http.put('/api/reg/tournament/swiss/saveResult', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

}

