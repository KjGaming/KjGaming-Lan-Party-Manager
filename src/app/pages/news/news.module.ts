import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './news.routing';
import { NewsComponent } from './news.component';
import { ReadNewsComponent } from './components/readNews/readNews.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        NewsComponent,
        ReadNewsComponent
    ]
})
export default class NewsModule {
}
