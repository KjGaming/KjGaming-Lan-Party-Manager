import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './memberlist.routing';
import { MemberlistComponent } from './memberlist.component';
import { MemberlistService } from "./memberlist.service";
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
        MemberlistComponent
    ],
    providers: [
        MemberlistService
    ]
})
export default class MemberlistModule {
}
