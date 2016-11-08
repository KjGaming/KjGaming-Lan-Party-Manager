import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { ErrorService } from "../../theme/components/errors/error.service";

@Injectable()
export class ServerService {

    constructor(private http: Http, private errorService:ErrorService) {
    }

    // Uses http.get() to load a single JSON file
    getNews(): Observable<any> {
        const token = localStorage.getItem('id_token')
            ? '?id_token=' + localStorage.getItem('id_token')
            : '';
        return this.http.get('/api/server' + token)
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                this.errorService.handleError(err.json());
                return Observable.throw(err.json());
            });

    }
}

