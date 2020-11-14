import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionGuard } from './modules/core/services/session.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.module').then((x) => x.AuthModule),
	},
	{
		path: 'private',
		loadChildren: () => import('./modules/private/private.module').then((x) => x.PrivateModule),
		canActivate: [SessionGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
