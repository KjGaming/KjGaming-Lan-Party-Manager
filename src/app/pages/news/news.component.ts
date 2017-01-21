import { Component, OnInit } from '@angular/core';
import { NewsService } from "./news.service";
import { News } from "./news.model";


@Component({
    selector: 'news',
    styles: [require('./news.scss')],
    template: require('./news.component.html')
})


export class NewsComponent implements OnInit{
    public news:News[] = [];

    constructor(private _newsService: NewsService) {
    }

    ngOnInit() {
        this.getNews();
    }

    getNews() {
        this._newsService.getNews().subscribe(
            // the first argument is a function which runs on success
            data => {
                let length:number = data.obj.length - 1;
                for(let key in data.obj){
                    this.news[length] = data.obj[key];
                    length -= 1;
                }
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }
}
