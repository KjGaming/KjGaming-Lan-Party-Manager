import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { User } from "../../model";
import { Observable } from "rxjs";
import { ErrorService } from "../../components/errors/error.service";

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('/api/user', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                this.errorService.handleError(err.json());
                return Observable.throw(err.json());
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('/api/user/signin', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                this.errorService.handleError(err.json());
                return Observable.throw(err.json());
            });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}