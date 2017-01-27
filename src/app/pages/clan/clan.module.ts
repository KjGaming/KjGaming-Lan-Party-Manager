import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './clan.routing';
import { ClanComponent } from './clan.component';
import { HttpModule } from "@angular/http";
import { CreatClanComponent } from "./components/creatClan/creatclan.component";
import { EditClanComponent } from "./components/editClan/editclan.component";
import { ShowClanComponent } from "./components/showClan/showclan.component";
import { ShowClanService } from "./components/showClan/showclan.service";
import { SimpleNotificationsModule } from "angular2-notifications/src/simple-notifications.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule,
        SimpleNotificationsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ClanComponent,
        CreatClanComponent,
        EditClanComponent,
        ShowClanComponent
    ],
    providers: [
    ]
})
export default class ClanModule {
}
