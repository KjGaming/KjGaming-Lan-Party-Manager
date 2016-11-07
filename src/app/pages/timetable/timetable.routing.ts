import { Routes, RouterModule }  from '@angular/router';

import { TimetableComponent } from './timetable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TimetableComponent
  }
];

export const routing = RouterModule.forChild(routes);
