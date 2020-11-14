import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	public formGroup: FormGroup;
	public state: 'initial' | 'success' = 'initial';

	constructor(public readonly site: SiteService, private readonly builder: FormBuilder) {
		this.formGroup = this.builder.group({
			name: '',
			phone: '',
			address: '',
			email: '',
			date: '',
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
		this.state = 'success';
	}
}
