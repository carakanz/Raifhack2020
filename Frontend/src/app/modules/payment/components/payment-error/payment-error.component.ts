import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-payment-error',
	templateUrl: './payment-error.component.html',
	styleUrls: ['./payment-error.component.scss'],
})
export class PaymentErrorComponent implements OnInit {
	public orderId: string;

	constructor(private readonly activated: ActivatedRoute) {}

	ngOnInit(): void {
		this.activated.queryParamMap.subscribe((x) => {
			this.orderId = x.get('orderId');
		});
	}
}
