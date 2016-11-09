import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './feedback.routing';
import { FeedbackComponent } from './feedback.component';
import { HttpModule } from "@angular/http";
import {SendMailService} from "../../theme/services/SendMailService/sendMail.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule,
        ReactiveFormsModule
    ],
    declarations: [
        FeedbackComponent
    ],
    providers: [
        SendMailService
    ]
})
export default class FeedbackModule {
}
