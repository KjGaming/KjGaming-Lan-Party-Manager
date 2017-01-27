import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './feedback.routing';
import { FeedbackComponent } from './feedback.component';
import { HttpModule } from "@angular/http";
import {BaSendMailService} from "../../theme/services/baSendMail/baSendMail.service";
import {SimpleNotificationsModule} from "angular2-notifications/src/simple-notifications.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule,
        ReactiveFormsModule,
        SimpleNotificationsModule
    ],
    declarations: [
        FeedbackComponent
    ],
    providers: [
        BaSendMailService
    ]
})
export default class FeedbackModule {
}
