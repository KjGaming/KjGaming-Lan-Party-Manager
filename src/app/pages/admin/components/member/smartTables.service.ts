import {Injectable} from '@angular/core';
import { Observable } from "rxjs";
import { Http,Headers, Response } from "@angular/http";


@Injectable()
export class SmartTablesService {

  constructor(private http: Http){}


  /** get alle users from the database **/
  getUserMemberlist(): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token')
    });

    return this.http.get('/api/user/all', {headers: headers})
        .map((res: Response) => res.json())
        .catch((err: Response)=> {
          return Observable.throw(err.json());
        });

  }

  /** save the current user, with the changing data **/
  changeUser(){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token')
    });
    return this.http.get('/api/user/all', {headers: headers})
        .map((res: Response) => res.json())
        .catch((err: Response)=> {
          return Observable.throw(err.json());
        });
  }

  /** create a new user **/
  createUser(){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token')
    });
    return this.http.get('/api/user/all', {headers: headers})
        .map((res: Response) => res.json())
        .catch((err: Response)=> {
          return Observable.throw(err.json());
        });

  }

  /** delete the current user **/
  delUser(){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token')
    });
    return this.http.get('/api/user/all', {headers: headers})
        .map((res: Response) => res.json())
        .catch((err: Response)=> {
          return Observable.throw(err.json());
        });

  }
}
