import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './download.routing';
import { DownloadComponent } from './download.component';
import { DownloadService } from "./download.service";
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
        DownloadComponent
    ],
    providers: [
        DownloadService
    ]
})
export default class DownloadModule {
}
