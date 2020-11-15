import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { SiteService } from '../../../core/services/site.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

declare var PaymentPageSdk: any;

@Component({
	selector: 'app-good',
	templateUrl: './good.component.html',
	styleUrls: ['./good.component.scss'],
})
export class GoodComponent implements OnInit {
	public state: 'initial' | 'payment' | 'complete' = 'initial';

	public formGroup: FormGroup;

	constructor(public readonly site: SiteService, private readonly builder: FormBuilder) {
		this.formGroup = builder.group({
			name: '',
			phone: '',
			address: '',
			email: '',
			dateTime: '',
		});
	}

	ngOnInit(): void {}

	public pay(): void {
		this.site.product.pipe(take(1)).subscribe((x) => {
			this.site
				.buyEcom({
					...this.formGroup.value,
					products: [x.id],
				})
				.pipe(take(1))
				.subscribe();
		});
	}

	dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
		if (view === 'month') {
			const date = cellDate.getDate();

			return date === 1 || date === 20 ? 'example-custom-date-class' : '';
		}

		return '';
	};

	public fill(): void {
		this.formGroup.setValue({
			name: 'Тестов Тест',
			phone: '+79631231234',
			address: 'Тестовая улица, д 5',
			email: 'germanarutyunov@gmail.com',
			dateTime: '2020-11-18T21:25:33.601Z',
		});
	}
}
