import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MySitesComponent} from "./components/smart/my-sites/my-sites.component";
import {CreateAndEditSiteComponent} from "./components/smart/create-and-edit-site/create-and-edit-site.component";

const routes: Routes = [
	{
		path: '',
		component: MySitesComponent,
	},
	{
		path: 'create',
		component: CreateAndEditSiteComponent,
	},
	{
		path: `edit/:id`,
		component: CreateAndEditSiteComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
