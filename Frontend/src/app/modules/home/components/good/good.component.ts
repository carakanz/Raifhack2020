import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { SiteService } from '../../../core/services/site.service';

@Component({
	selector: 'app-good',
	templateUrl: './good.component.html',
	styleUrls: ['./good.component.scss'],
})
export class GoodComponent implements OnInit {
	public state: 'initial' | 'payment' | 'complete' = 'initial';

	constructor(public readonly site: SiteService) {}

	ngOnInit(): void {}

	public pay(): void {
		switch (this.state) {
			case 'initial':
				this.state = 'payment';
				break;
		}
	}

	dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
		if (view === 'month') {
			const date = cellDate.getDate();

			return date === 1 || date === 20 ? 'example-custom-date-class' : '';
		}

		return '';
	};
}
