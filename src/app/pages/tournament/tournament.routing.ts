import { Routes, RouterModule }  from '@angular/router';

import { TournamentComponent } from './tournament.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TournamentComponent
  }
];

export const routing = RouterModule.forChild(routes);
