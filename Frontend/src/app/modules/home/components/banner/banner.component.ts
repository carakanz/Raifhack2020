import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
	get banner(): string {
		return this._banner;
	}
	// tslint:disable-next-line:variable-name
	private _banner: string;
	constructor(public readonly site: SiteService) {}

	ngOnInit(): void {
		this.site.banner.subscribe((x) => {
			if (typeof x === 'string') {
				this._banner = x;
			} else {
				this._banner = URL.createObjectURL(x);
			}
		});
	}
}
