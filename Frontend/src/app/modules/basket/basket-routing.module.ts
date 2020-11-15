import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: BasketComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BasketRoutingModule {}
