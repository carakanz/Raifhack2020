import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../../core/services/site.service';

@Component({
	selector: 'app-payment-success',
	templateUrl: './payment-success.component.html',
	styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {
	public orderId: string;

	constructor(private readonly activated: ActivatedRoute, public site: SiteService) {}

	ngOnInit(): void {
		this.activated.queryParamMap.subscribe((x) => {
			this.orderId = x.get('orderId');
		});
		this.site.basket.next([]);
		localStorage.clear();
	}
}
