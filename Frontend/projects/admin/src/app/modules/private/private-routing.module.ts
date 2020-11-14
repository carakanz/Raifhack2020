import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'dashboard',
	},
	{
		path: 'profile',
	},
	{
		path: 'statistics',
	},
	{
		path: 'business',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PrivateRoutingModule {}
