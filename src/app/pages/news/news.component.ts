import { Component, OnInit } from '@angular/core';
/*import { NewsService } from "./news.service";
import { News } from "./news.model";*/
import { Http, Response } from "@angular/http";
import { NewsService } from "./news.service";
import { News } from "./news.model";


@Component({
    selector: 'news',
    styles: [require('./news.scss')],
    template: require('./news.component.html')
})


export class NewsComponent implements OnInit{
    public news:News[];

    /*public news: any[];*/

    constructor(private _newsService: NewsService) {
    }

    ngOnInit() {
        this.getNews();
       /* console.log(this.news);*/
        /*this.changeDate();*/


    }

    changeDate() {

    }

    getNews() {
        this._newsService.getNews().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.news = data.obj;
                for(let test of this.news){
                    test.date = new Date(test.date * 1000);
                    test.day = new Date(test.date).getDate();
                    test.month = new Date(test.date).getMonth() + 1;

                    test.year = new Date(test.date).getFullYear();
                    test.time = new Date(test.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                };
                console.log(this.news);
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }


  /*  data: Object;

    constructor(private http: Http) {
    }

    getNews(): void {
        this.http.request('/api/news')
            .subscribe((res: Response) => {
                this.data = res.json().obj[0];
            });
    }

    ngOnInit() {
        this.getNews();*/




/*news: News[] = [];


constructor(private newsService: NewsService) {
}

ngOnInit() {
    this.newsService.getNews()
        .subscribe(
            (news: News[]) => {
                this.news = news
            }
        );
}*/
}
