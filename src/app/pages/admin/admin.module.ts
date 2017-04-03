import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';

import {routing}       from './admin.routing';
import {AdminComponent} from './admin.component';
import {SettingsComponent} from './components/settings/settings.component';
import {AdminNewsComponent} from "./components/news/news.component";
import {AdminServerComponent} from "./components/server/server.component";
import {AdminEventComponent} from "./components/event/event.component";
import {AdminDownloadComponent} from "./components/download/download.component";
import {UiSwitchModule} from "angular2-ui-switch";
import {AdminMemberComponent} from "./components/member/member.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CKEditorModule} from 'ng2-ckeditor';
import {AdminProductComponent} from "./components/product/product.component";
import {AdminStatisticsComponent} from "./components/statistics/statistics.component";
import { ChartsModule } from 'ng2-charts';
import {AdminTournamentComponent} from "./components/tournament/tournament.component";
import {AdminSidesComponent} from "./components/sides/sides.component";
import { AdminCateringComponent } from "app/pages/admin/components/catering";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        UiSwitchModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        SimpleNotificationsModule,
        CKEditorModule,
        ChartsModule

    ],
    declarations: [
        AdminComponent,
        SettingsComponent,
        AdminNewsComponent,
        AdminServerComponent,
        AdminEventComponent,
        AdminDownloadComponent,
        AdminMemberComponent,
        AdminProductComponent,
        AdminStatisticsComponent,
        AdminTournamentComponent,
        AdminSidesComponent,
        AdminCateringComponent
    ],
    providers: [
    ]
})
export default class AdminModule {
}
