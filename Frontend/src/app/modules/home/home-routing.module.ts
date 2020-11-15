import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';

@Component({
	template: `<router-outlet></router-outlet>`,
})
export class Wrapper {}

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'categories',
				component: Wrapper,
				children: [
					{
						path: ':slug',
						component: CategoryComponent,
					},
				],
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	declarations: [Wrapper],
})
export class HomeRoutingModule {}
