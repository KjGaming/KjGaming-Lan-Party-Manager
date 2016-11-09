import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './feedback.routing';
import { FeedbackComponent } from './feedback.component';
import { HttpModule } from "@angular/http";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule
    ],
    declarations: [
        FeedbackComponent
    ],
    providers: [
    ]
})
export default class FeedbackModule {
}
