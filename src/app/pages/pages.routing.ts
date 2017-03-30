import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { AuthGuard, RegGuard } from "../theme/guard";
import { AdminGuard } from "../theme/guard/admin.guard";
import { SideGuard } from "../theme/guard/side.guard";
import { ChatComponent } from "./chat/chat.component";
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
		path: 'passwortForgot',
		loadChildren: () => System.import('./passwordForgot/pf.module')
	},

	{
		path: 'confirmReg',
		loadChildren: () => System.import('./confirmReg/confirmReg.module')
	},
	{
		path: 'pages',
		component: Pages,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				redirectTo: 'news',
				pathMatch: 'full',
				canActivate: [AuthGuard]
			},
			{
				path: 'news',
				loadChildren: () => System.import('./news/news.module'),
				canActivate: [AuthGuard]
			},
			{
				path: 'chat',
				loadChildren: () => System.import('./chat/chat.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'textBox',
				loadChildren: () => System.import('./textBox/textBox.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'userEdit',
				loadChildren: () => System.import('./userEdit/userEdit.module'),
				canActivate: [AuthGuard]
			},
			{
				path: 'timetable',
				loadChildren: () => System.import('./timetable/timetable.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'memberlist',
				loadChildren: () => System.import('./memberlist/memberlist.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'clan',
				loadChildren: () => System.import('./clan/clan.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'server',
				loadChildren: () => System.import('./server/server.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'tournament',
				loadChildren: () => System.import('./tournament/tournament.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'download',
				loadChildren: () => System.import('./download/download.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'catering',
				loadChildren: () => System.import('./catering/catering.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'feedback',
				loadChildren: () => System.import('./feedback/feedback.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'seating',
				loadChildren: () => System.import('./seating/seating.module'),
				canActivate: [AuthGuard, SideGuard]
			},
			{
				path: 'admin',
				loadChildren: () => System.import('./admin/admin.module'),
				canActivate: [AuthGuard, AdminGuard]
			}
		]
	}

];

export const routing = RouterModule.forChild(routes);
