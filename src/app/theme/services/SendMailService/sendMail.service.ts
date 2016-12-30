import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';

import {Observable} from "rxjs";
import { Mail } from "../../model/mail.model";


@Injectable()
export class SendMailService {
    constructor(private http: Http) {
    }

    sendMail(mail: Mail) {
        const body = JSON.stringify(mail);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.post('/api/sendMail', body, {headers: headers})
            .map((res: Response)=> res.json())
            .catch((err: Response)=>{
                return Observable.throw(err.json());
            });

    }

}