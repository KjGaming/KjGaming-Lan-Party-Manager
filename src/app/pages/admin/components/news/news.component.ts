import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {BaNewsService} from "../../../../theme/services/baNews/baNews.service";

@Component({
    selector: 'admin-news',
    styles: [require('./news.scss')],
    template: require('./news.component.html'),
})
export class AdminNewsComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    public ckeditorNewsCreate: string = '<p>Hello CKEditor</p>';
    public ckeditorNewsEdit: string;

    news: any = [];
    contentNews: any = [];
    id;

    createTitle: string;
    createIcon: string = 'envelope';
    createColor: string = 'red';

    editTitle: string;
    editIcon: string = 'envelope';
    editColor: string = 'red';


    public config = {
        uiColor: '#282828',
        toolbar: [
            {name: 'document', items: ['Source']},
            {name: 'clipboard', items: ['Undo', 'Redo']},
            {name: 'editing', items: ['Scayt']},
            {
                name: 'forms',
                items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField']
            },
            '/',
            {
                name: 'basicstyles',
                items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
            },
            {
                name: 'paragraph',
                items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
            },
            {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
            {
                name: 'insert',
                items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
            },
            '/',
            {name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize']},
            {name: 'colors', items: ['TextColor', 'BGColor']},
            {name: 'tools', items: ['Maximize', 'ShowBlocks']},
        ]
    };

    constructor(protected _newsService: BaNewsService, private _toastService: NotificationsService) {
    }

    ngOnInit() {
        this.getNews();
    }

    onChange(){
        for(let oneNews of this.news){
            if(oneNews._id == this.id){
                this.editTitle = oneNews.title;
                this.editIcon = oneNews.icon.look;
                this.editColor = oneNews.icon.color;
                this.ckeditorNewsEdit = oneNews.content;
            }
        }

    }

    getNews() {
        this._newsService.getNews().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.news = data.obj;
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('creat News')
        );
    }

    creatNews() {
        const data = {
            title: this.createTitle,
            content: this.ckeditorNewsCreate,
            iconLook: this.createIcon,
            iconColor: this.createColor
        };

        this._newsService.createNews(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                console.log(data);
                this._toastService.success(data.title, data.message);
                this.ngOnInit();

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('creat News')
        );
    }

    updateNews() {
        const data = {
            id: this.id,
            title: this.editTitle,
            content: this.ckeditorNewsEdit,
            iconLook: this.editIcon,
            iconColor: this.editColor
        };

        this._newsService.changeNews(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                console.log(data);
                this._toastService.success(data.title, data.message);
                this.ngOnInit();

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('edit News')
        );
    }

    delNews() {
        const data = {
            id: this.id
        };

        this._newsService.delNews(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                console.log(data);
                this._toastService.success(data.title, data.message);
                this.ngOnInit();

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('delete News')
        );
    }
}
