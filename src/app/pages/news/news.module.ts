import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './news.routing';
import { NewsComponent } from './news.component';
/*import { NewsService } from "./news.service";
import { News } from "./news.model";*/
import { HttpModule } from "@angular/http";
import { NewsService } from "./news.service";
import {ChangeArrayDirectionPipe} from "../../theme/pipes/changeArrayDirection/changeArrayDirection.pipe";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule
    ],
    declarations: [
        NewsComponent
    ],
    providers: [
        NewsService
    ]
})
export default class NewsModule {
}
