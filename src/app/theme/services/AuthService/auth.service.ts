import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { User } from "../../model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {NotificationsService} from "angular2-notifications/src/notifications.service";


@Injectable()
export class AuthService {
    constructor(private http: Http, private _toastService: NotificationsService, private router: Router) {
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('/api/user', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('/api/user/signin', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    isAuthenticated() {
        var token = localStorage.getItem('id_token');
        var expireDate = localStorage.getItem('expireDate');
        if (token) {
            if (Number(expireDate) > Date.now()) {
                return true;
            } else {
                localStorage.clear();
                this.router.navigate(['/login']);
                return false;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    isLoggedIn() {
        return localStorage.getItem('id_token') !== null;
    }

    isAdmin(): boolean {
        var adminToken = Number(localStorage.getItem('blackWidow'));
        console.log(adminToken);
        if (adminToken == 481) {
            return true;
        } else if (adminToken == 153) {
            return true;
        } else {
            return false;
        }

    }

    successfullLogIn() {
        var token = localStorage.getItem('regToken');

        if (token == 'LoggedInSuccessfully') {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }


}