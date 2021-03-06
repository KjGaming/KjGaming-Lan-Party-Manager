import { Routes, RouterModule }  from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminNewsComponent } from "./components/news/news.component";
import { AdminDownloadComponent } from "./components/download/download.component";
import { AdminServerComponent } from "./components/server/server.component";
import { AdminEventComponent } from "./components/event/event.component";
import { AdminMemberComponent } from "./components/member/member.component";
import {AdminProductComponent} from "./components/product/product.component";
import {AdminStatisticsComponent} from "./components/statistics/statistics.component";
import {AdminTournamentComponent} from "./components/tournament/tournament.component";
import {AdminSidesComponent} from "./components/sides/sides.component";
import { AdminCateringComponent } from "app/pages/admin/components/catering";
import { AdminReOrderComponent } from "app/pages/admin/components/reOrder";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'news', component: AdminNewsComponent },
      { path: 'download', component: AdminDownloadComponent },
      { path: 'server', component: AdminServerComponent },
      { path: 'event', component: AdminEventComponent },
      { path: 'user', component: AdminMemberComponent },
      { path: 'catering', component: AdminCateringComponent },
      { path: 'tournament', component: AdminTournamentComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'statistic', component: AdminStatisticsComponent },
      { path: 'sides', component: AdminSidesComponent },
      { path: 'reOrder', component: AdminReOrderComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
