import {Injectable} from '@angular/core';
import { Observable } from "rxjs";
import { Http,Headers, Response } from "@angular/http";


@Injectable()
export class SmartTablesService {

  constructor(private http: Http){
  }



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

  smartTableData = [
    {
      "name": "Hope 'Genmom' Bright",
      "age": 19,
      "lock": false,
      "role": 2,
      "packetPaid": false,
      "lanPaid": true,
      "changeFood": 8789
    },
    {
      "name": "Carla 'Vantage' Horton",
      "age": 25,
      "lock": true,
      "role": 2,
      "packetPaid": false,
      "lanPaid": false,
      "changeFood": 5757
    },
    {
      "name": "Kristie 'Terragen' Hunt",
      "age": 28,
      "lock": false,
      "role": 0,
      "packetPaid": false,
      "lanPaid": false,
      "changeFood": 2429
    },
    {
      "name": "Mays 'Pyrami' Scott",
      "age": 31,
      "lock": true,
      "role": 1,
      "packetPaid": true,
      "lanPaid": false,
      "changeFood": 5906
    },
    {
      "name": "Pearl 'Vertide' Fulton",
      "age": 16,
      "lock": true,
      "role": 1,
      "packetPaid": false,
      "lanPaid": true,
      "changeFood": 4471
    },
    {
      "name": "Marsha 'Exoteric' Burks",
      "age": 24,
      "lock": false,
      "role": 2,
      "packetPaid": false,
      "lanPaid": true,
      "changeFood": 5443
    },
    {
      "name": "Jenkins 'Equitox' Bass",
      "age": 32,
      "lock": true,
      "role": 2,
      "packetPaid": false,
      "lanPaid": false,
      "changeFood": 1281
    },
    {
      "name": "Boone 'Netbook' Clemons",
      "age": 17,
      "lock": false,
      "role": 1,
      "packetPaid": false,
      "lanPaid": true,
      "changeFood": 6456
    },
    {
      "name": "Deanne 'Krog' Vinson",
      "age": 17,
      "lock": false,
      "role": 0,
      "packetPaid": false,
      "lanPaid": true,
      "changeFood": 9183
    },
    {
      "name": "Ellison 'Pawnagra' Byers",
      "age": 20,
      "lock": true,
      "role": 1,
      "packetPaid": true,
      "lanPaid": false,
      "changeFood": 10035
    },
    {
      "name": "Moses 'Signity' Olsen",
      "age": 16,
      "lock": false,
      "role": 0,
      "packetPaid": true,
      "lanPaid": false,
      "changeFood": 2406
    },
    {
      "name": "Hooper 'Cognicode' Crane",
      "age": 28,
      "lock": false,
      "role": 2,
      "packetPaid": false,
      "lanPaid": true,
      "changeFood": 5116
    },
    {
      "name": "Geraldine 'Insuron' Reed",
      "age": 26,
      "lock": true,
      "role": 1,
      "packetPaid": false,
      "lanPaid": true,
      "changeFood": 10200
    },
    {
      "name": "Carter 'Quinex' Carroll",
      "age": 27,
      "lock": true,
      "role": 1,
      "packetPaid": true,
      "lanPaid": true,
      "changeFood": 4614
    },
    {
      "name": "Miranda 'Biospan' Hawkins",
      "age": 28,
      "lock": false,
      "role": 2,
      "packetPaid": true,
      "lanPaid": true,
      "changeFood": 268
    },
    {
      "name": "Nelda 'Digifad' Carson",
      "age": 31,
      "lock": true,
      "role": 2,
      "packetPaid": false,
      "lanPaid": false,
      "changeFood": 4796
    },
    {
      "name": "Maryann 'Overplex' Goodwin",
      "age": 30,
      "lock": false,
      "role": 0,
      "packetPaid": true,
      "lanPaid": true,
      "changeFood": 6403
    },
    {
      "name": "Glover 'Portalis' Charles",
      "age": 30,
      "lock": true,
      "role": 0,
      "packetPaid": false,
      "lanPaid": false,
      "changeFood": 6509
    },
    {
      "name": "Serena 'Gracker' Ellison",
      "age": 25,
      "lock": false,
      "role": 2,
      "packetPaid": false,
      "lanPaid": false,
      "changeFood": 9748
    },
    {
      "name": "Harriet 'Polarium' Baldwin",
      "age": 23,
      "lock": true,
      "role": 1,
      "packetPaid": true,
      "lanPaid": true,
      "changeFood": 6221
    }
  ];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.smartTableData);
      }, 2000);
    });
  }
}
