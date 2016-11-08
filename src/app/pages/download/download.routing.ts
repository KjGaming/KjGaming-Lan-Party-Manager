import { Routes, RouterModule }  from '@angular/router';

import { DownloadComponent } from './download.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DownloadComponent
  }
];

export const routing = RouterModule.forChild(routes);
