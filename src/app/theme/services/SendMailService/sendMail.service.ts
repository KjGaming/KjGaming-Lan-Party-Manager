import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';

import {Observable} from "rxjs";
import {Router} from "@angular/router";
import { Mail } from "../../model/mail.model";
import {NotificationsService} from "angular2-notifications/src/notifications.service";


@Injectable()
export class SendMailService {
    constructor(private http: Http, private _toastService: NotificationsService, private router: Router) {
    }

    sendMail(mail: Mail) {
        const body = JSON.stringify(mail);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.post('/api/sendMail', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=> {
                this._toastService.error('Test', 'test');
                return Observable.throw(err.json);
            });

    }

}