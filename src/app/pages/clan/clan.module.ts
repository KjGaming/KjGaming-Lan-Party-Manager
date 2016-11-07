import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './clan.routing';
import { ClanComponent } from './clan.component';
import { ClanService } from "./clan.service";
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
        ClanComponent
    ],
    providers: [
        ClanService
    ]
})
export default class ClanModule {
}
