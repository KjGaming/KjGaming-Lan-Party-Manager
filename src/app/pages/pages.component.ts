import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'pages',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i>  |  v1.1.0</div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://kjgaming.de">KjGaming</a> 2017</div>
        <ul class="al-share clearfix">
          <li>
              <a target="_blank" href="https://www.facebook.com/KjGaming.LANParty.Filderstadt">
                <i class="socicon socicon-facebook"></i>
              </a>
              <a target="_blank" href="http://steamcommunity.com/groups/kjgaming">
                <i class="socicon socicon-steam"></i>
              </a>
              <a target="_blank" href="https://twitter.com/KjGamingg">
                <i class="socicon socicon-twitter"></i>
              </a>
              <a target="_blank" href="https://www.instagram.com/kjgamingg/">
                <i class="socicon socicon-instagram"></i>
              </a>
          </li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
   
    
    `
})
export class Pages {

    constructor() {
    }

    ngOnInit() {
    }
}
