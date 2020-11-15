import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./modules/home/home.module').then((x) => x.HomeModule),
	},
	{
		path: 'basket',
		loadChildren: () => import('./modules/basket/basket.module').then((x) => x.BasketModule),
	},
	{
		path: 'payment',
		loadChildren: () => import('./modules/payment/payment.module').then((x) => x.PaymentModule),
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
