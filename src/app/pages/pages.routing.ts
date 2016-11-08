import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { AuthGuard, RegGuard } from "../theme/guard";
import { AdminGuard } from "../theme/guard/admin.guard";
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
        canActivate: [RegGuard]
    },
    {
        path: 'pages',
        component: Pages,
        canActivate: [AuthGuard],
        children: [
            {path: '', redirectTo: 'news', pathMatch: 'full', canActivate: [AuthGuard]},
            {path: 'editors', loadChildren: () => System.import('./editors/editors.module'), canActivate: [AuthGuard]},
            {path: 'charts', loadChildren: () => System.import('./charts/charts.module'), canActivate: [AuthGuard]},
            {path: 'news', loadChildren: () => System.import('./news/news.module'), canActivate: [AuthGuard]},
            {
                path: 'timetable',
                loadChildren: () => System.import('./timetable/timetable.module'),
                canActivate: [AuthGuard]
            },
            {
                path: 'memberlist',
                loadChildren: () => System.import('./memberlist/memberlist.module'),
                canActivate: [AuthGuard]
            },
            {path: 'clan', loadChildren: () => System.import('./clan/clan.module'), canActivate: [AuthGuard]},
            {path: 'server', loadChildren: () => System.import('./server/server.module'), canActivate: [AuthGuard]},
            {
                path: 'tournament',
                loadChildren: () => System.import('./tournament/tournament.module'),
                canActivate: [AuthGuard]
            },
            {
                path: 'download',
                loadChildren: () => System.import('./download/download.module'),
                canActivate: [AuthGuard]
            },
            {
                path: 'catering',
                loadChildren: () => System.import('./catering/catering.module'),
                canActivate: [AuthGuard]
            },
            {
                path: 'feedback',
                loadChildren: () => System.import('./feedback/feedback.module'),
                canActivate: [AuthGuard]
            },
            {path: 'seating', loadChildren: () => System.import('./seating/seating.module'), canActivate: [AuthGuard]},
            {path: 'ui', loadChildren: () => System.import('./ui/ui.module'), canActivate: [AuthGuard]},
            {path: 'forms', loadChildren: () => System.import('./forms/forms.module'), canActivate: [AuthGuard]},
            {path: 'tables', loadChildren: () => System.import('./tables/tables.module'), canActivate: [AuthGuard]},
            {path: 'maps', loadChildren: () => System.import('./maps/maps.module'), canActivate: [AuthGuard]},
            {path: 'admin', loadChildren: () => System.import('./admin/admin.module'), canActivate: [AuthGuard, AdminGuard]}
        ]
    }

];

export const routing = RouterModule.forChild(routes);
