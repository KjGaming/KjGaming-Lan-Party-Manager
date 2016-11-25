import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CateringService {

    constructor(private http: Http) {
    }

    // Uses http.get() to load a single JSON file
    getProducts(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.get('/api/catering/products', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    getCatering(status): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        const token = '?status='+status;
        return this.http.get('/api/catering/' + token, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    deleteOrdered(): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        return this.http.get('/api/catering/deleteOrdered', {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }

    sendOrdered(product): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token')
        });
        const time = Date.now();

        const bodyObj = {
            ordered: time,
            products:[]
        };

        for(let key in product){
            bodyObj.products.push({
                id: product[key].id,
                count: product[key].count
            });
        }
        const body = JSON.stringify(bodyObj);
        console.log(body);

        return this.http.post('/api/catering/ordered', body, {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: Response)=> {
                return Observable.throw(err.json());
            });

    }


}

