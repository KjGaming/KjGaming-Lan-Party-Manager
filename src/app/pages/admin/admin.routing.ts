import { Routes, RouterModule }  from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminNewsComponent } from "./components/news/news.component";
import { AdminDownloadComponent } from "./components/download/download.component";
import { AdminServerComponent } from "./components/server/server.component";
import { AdminEventComponent } from "./components/event/event.component";

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
      { path: 'user', component: AdminNewsComponent },
      { path: 'catering', component: AdminNewsComponent },
      { path: 'tournament', component: AdminNewsComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
