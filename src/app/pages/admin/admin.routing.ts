import { Routes, RouterModule }  from '@angular/router';

import { AdminComponent } from './admin.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminNewsComponent } from "./components/news/news.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'settings', component: SettingsComponent },
      { path: 'news', component: AdminNewsComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
