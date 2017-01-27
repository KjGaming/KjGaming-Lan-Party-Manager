import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BaUserService {

    constructor(private http: Http) {
    }

    /** get alle users from the database with minmal Userdata **/
    getMinimalUserMemberlist(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/reg/user', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    /** get alle users from the database **/
    getUserMemberlist(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/admin/user/', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    /** change the current user, with the changing data **/
    changeUser(data) {
        const body = JSON.stringify(data);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.put('/api/admin/user/', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });
    }

    /** create a new user **/
    createUser(data) {
        const body = JSON.stringify(data);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.post('/api/admin/user/', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

    /** delete the current user **/
    delUser(data) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.delete('/api/admin/user/' + data.id, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }
}