import { Routes, RouterModule }  from '@angular/router';

import { SeatingComponent } from './seating.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SeatingComponent
  }
];

export const routing = RouterModule.forChild(routes);
