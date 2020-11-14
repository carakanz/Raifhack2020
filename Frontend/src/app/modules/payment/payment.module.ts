import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentErrorComponent } from './components/payment-error/payment-error.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [PaymentSuccessComponent, PaymentErrorComponent],
	imports: [CommonModule, PaymentRoutingModule, SharedModule],
})
export class PaymentModule {}
