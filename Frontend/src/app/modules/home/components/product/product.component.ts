import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	constructor(public readonly site: SiteService) {}

	ngOnInit(): void {}
}
