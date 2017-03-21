import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';

import {routing}       from './userEdit.routing';
import {UserEditComponent} from './userEdit.component';
import {HttpModule} from "@angular/http";
import {ShowClanService} from "./components/showClan/showclan.service";
import {SimpleNotificationsModule} from "angular2-notifications/src/simple-notifications.module";
import {GamesUserEditComponent} from "./Component/games/games.component";
import {PasswordUserEditComponent} from "./Component/password/password.component";
import {FoodUserEditComponent} from "./Component/food/food.component";
import {TagInputModule} from 'ng2-tag-input';
import {UiSwitchModule} from "../../../../node_modules/angular2-ui-switch/dist/index";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule,
        SimpleNotificationsModule,
        ReactiveFormsModule,
        TagInputModule,
        UiSwitchModule
    ],
    declarations: [
        UserEditComponent,
        GamesUserEditComponent,
        FoodUserEditComponent,
        PasswordUserEditComponent
    ],
    providers: []
})
export default class UserEditModule {
}
