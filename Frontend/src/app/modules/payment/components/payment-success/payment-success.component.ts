import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-payment-success',
	templateUrl: './payment-success.component.html',
	styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {
	public orderId: string;

	constructor(private readonly activated: ActivatedRoute) {}

	ngOnInit(): void {
		this.activated.queryParamMap.subscribe((x) => {
			this.orderId = x.get('orderId');
		});
	}
}
