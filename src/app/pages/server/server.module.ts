import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './server.routing';
import { ServerComponent } from './server.component';
import { ServerService } from "./server.service";
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
        ServerComponent
    ],
    providers: [
        ServerService
    ]
})
export default class ServerModule {
}
