import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./modules/dashboard/dashboard.module').then((x) => x.DashboardModule),
	},
	{
		path: 'business',
		loadChildren: () => import('./modules/business/business.module').then((x) => x.BusinessModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
