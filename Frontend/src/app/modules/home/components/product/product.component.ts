import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	constructor(public readonly site: SiteService) {}

	ngOnInit(): void {}
	dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
		if (view === 'month') {
			const date = cellDate.getDate();

			return date === 1 || date === 20 ? 'example-custom-date-class' : '';
		}

		return '';
	};
}
