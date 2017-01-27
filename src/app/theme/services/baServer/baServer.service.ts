import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BaServerService {

    constructor(private http: Http) {
    }

    /** get all servers and downloads **/
    get(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/reg/server', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    /** save the current baServer or download, with the changing data **/
    change(data) {
        const body = JSON.stringify(data);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.put('/api/admin/server', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    /** create a new baServer or download **/
    create(data) {
        const body = JSON.stringify(data);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.post('/api/admin/server', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    /** delete the baServer or the download **/
    del(data) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.delete('/api/admin/server/' + data.id, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    /** change the status of a baServer **/
    status(data) {
        const body = JSON.stringify(data);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.put('/api/admin/server/status', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }
}