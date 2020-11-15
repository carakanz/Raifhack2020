import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './components/site/site.component';

const routes: Routes = [
	{
		path: ':id',
		component: SiteComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SitesRoutingModule {}
