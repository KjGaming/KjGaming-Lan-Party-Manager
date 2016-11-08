import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './catering.routing';
import { CateringComponent } from './catering.component';
import { CateringService } from "./catering.service";
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
        CateringComponent
    ],
    providers: [
        CateringService
    ]
})
export default class CateringModule {
}
