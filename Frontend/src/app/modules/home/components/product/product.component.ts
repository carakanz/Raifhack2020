import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	public formGroup: FormGroup;
	public state: 'initial' | 'success' = 'initial';
	public orderId: number | string;

	constructor(
		public readonly site: SiteService,
		private readonly builder: FormBuilder,
		public readonly overlay: MatDialogRef<any>
	) {
		this.formGroup = this.builder.group({
			name: '',
			phone: '',
			address: '',
			email: '',
			dateTime: '',
		});
	}

	ngOnInit(): void {}
	dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
		if (view === 'month') {
			const date = cellDate.getDate();

			return date === 1 || date === 20 ? 'example-custom-date-class' : '';
		}

		return '';
	};

	public purchase(): void {
		this.site.product.pipe(take(1)).subscribe((x) => {
			this.site
				.buy({
					...this.formGroup.value,
					products: [x.id],
				})
				.pipe(take(1))
				.subscribe((y) => {
					this.orderId = y.orderId;
					this.state = 'success';
				});
		});
	}

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
