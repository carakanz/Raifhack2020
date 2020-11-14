import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
	constructor(public readonly site: SiteService) {}

	ngOnInit(): void {}
}
