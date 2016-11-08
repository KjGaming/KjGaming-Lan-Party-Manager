import { Routes, RouterModule }  from '@angular/router';

import { AdminComponent } from './admin.component';
import { SettingsComponent } from './components/settings/settings.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
