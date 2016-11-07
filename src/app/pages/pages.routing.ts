import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { AuthGuard, RegGuard} from "../theme/guard";
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  {
    path: 'confirmReg',
    loadChildren: () => System.import('./confirmReg/confirmReg.module'),
    canActivate:[RegGuard]
  },
  {
    path: 'pages',
    component: Pages,
    canActivate:[AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate:[AuthGuard] },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module'), canActivate:[AuthGuard] },
      { path: 'editors', loadChildren: () => System.import('./editors/editors.module'), canActivate:[AuthGuard] },
      { path: 'charts', loadChildren: () => System.import('./charts/charts.module'), canActivate:[AuthGuard] },
      { path: 'news', loadChildren: () => System.import('./news/news.module'), canActivate:[AuthGuard] },
      { path: 'timetable', loadChildren: () => System.import('./timetable/timetable.module'), canActivate:[AuthGuard] },
      { path: 'memberlist', loadChildren: () => System.import('./memberlist/memberlist.module'), canActivate:[AuthGuard] },
      { path: 'clan', loadChildren: () => System.import('./clan/clan.module'), canActivate:[AuthGuard] },
      { path: 'seating', loadChildren: () => System.import('./seating/seating.module'), canActivate:[AuthGuard] },
      { path: 'ui', loadChildren: () => System.import('./ui/ui.module'), canActivate:[AuthGuard] },
      { path: 'forms', loadChildren: () => System.import('./forms/forms.module'), canActivate:[AuthGuard] },
      { path: 'tables', loadChildren: () => System.import('./tables/tables.module'), canActivate:[AuthGuard] },
      { path: 'maps', loadChildren: () => System.import('./maps/maps.module'), canActivate:[AuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
