import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NewsService {

    constructor(private http: Http) {
    }

    // Uses http.get() to load a single JSON file
    getNews(): Observable<any> {
        return this.http.get('/api/news')
            .map((res: Response) => res.json());

    }
}

