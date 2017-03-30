import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BaTextBoxService {

    constructor(private http: Http) {
    }

    /** get all servers and downloads **/
    get(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });

        return this.http.get('/api/reg/textBox', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response) => {
                return Observable.throw(err.json());
            });

    }

}