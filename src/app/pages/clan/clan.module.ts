import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './clan.routing';
import { ClanComponent } from './clan.component';
import { ClanService } from "./clan.service";
import { HttpModule } from "@angular/http";
import { CreatClanComponent } from "./components/creatClan/creatclan.component";
import { EditClanComponent } from "./components/editClan/editclan.component";
import { ShowClanComponent } from "./components/showClan/showclan.component";
import { ShowClanService } from "./components/showClan/showclan.service";
import { CreatClanService } from "./components/creatClan/creatclan.service";
import { EditClanService } from "./components/editClan/editclan.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule
    ],
    declarations: [
        ClanComponent,
        CreatClanComponent,
        EditClanComponent,
        ShowClanComponent
    ],
    providers: [
        ClanService,
        CreatClanService,
        EditClanService,
        ShowClanService,


    ]
})
export default class ClanModule {
}
