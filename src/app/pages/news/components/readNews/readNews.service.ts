import { Component, OnInit, Injectable } from '@angular/core';
import { Response } from "@angular/http";
import { Observable } from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'kjg-readNews.service.ts',
    templateUrl: 'readNews.service.ts.html',
    styles: []
})

@Injectable
export class ReadNewsService {
    private users: User[] = [];

    constructor(private http: Http) {

    }

    getUsers() {
        return this.http.get('http://localhost:3000/pages/news')
            .map((response: Response) => {
                const users = response.json().obj;
                let transformUsers: User[] = [];
                for (let user of users) {
                    transformUsers.push(new User(user.content, user.id, "Dummy", null));
                }
                return transformUsers;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}