import { Routes, RouterModule }  from '@angular/router';

import { CateringComponent } from './catering.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CateringComponent
  }
];

export const routing = RouterModule.forChild(routes);
