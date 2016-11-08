import { Routes, RouterModule }  from '@angular/router';

import { ServerComponent } from './server.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ServerComponent
  }
];

export const routing = RouterModule.forChild(routes);
