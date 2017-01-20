import {Component} from '@angular/core';
import {NewsService} from "../../../news/news.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'admin-news',
  styles: [require('./news.scss')],
  template: require('./news.component.html'),
})
export class AdminNewsComponent{
  public ckeditorNewsCreate:string = '<p>Hello CKEditor</p>';
  public ckeditorNewsEdit:string;

  createTitle:string;
  createIcon:string = 'envelope';
  createColor:string = 'red';

  editTitle:string;


  public config = {
    uiColor: '#282828',
    toolbar:[
      { name: 'document', items: [ 'Source'] },
      { name: 'clipboard', items: ['Undo', 'Redo' ] },
      { name: 'editing', items: [  'Scayt' ] },
      { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
      '/',
      { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
      { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
      { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
      { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
      '/',
      { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
      { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
      { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
    ]};

  constructor(protected _newsService: NewsService, private _toastService: NotificationsService) {
  }


  creatNews(){
    const data = {
      title: this.createTitle,
      content: this.ckeditorNewsCreate,
      look: this.createIcon,
      color: this.createColor
    };

    this._newsService.changeNews(data).subscribe(
        // the first argument is a function which runs on success
        data => {
          console.log(data);
          this._toastService.success('Erstellt', 'Du hast erfoglreich eine News erstellt');

        },
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => console.log('creat News')
    );
  }
}
