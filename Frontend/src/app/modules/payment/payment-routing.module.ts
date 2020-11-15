import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentErrorComponent } from './components/payment-error/payment-error.component';

const routes: Routes = [
	{
		path: 'success',
		component: PaymentSuccessComponent,
	},
	{
		path: 'error',
		component: PaymentErrorComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PaymentRoutingModule {}
