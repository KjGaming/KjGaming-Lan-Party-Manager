import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pages/news', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/news' }
]

export const routing = RouterModule.forRoot(routes,{ useHash: false });
