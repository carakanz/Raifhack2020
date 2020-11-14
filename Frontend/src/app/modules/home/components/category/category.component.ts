import { Component, Input, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
	constructor(public readonly site: SiteService, private readonly activated: ActivatedRoute) {}

	ngOnInit(): void {
		this.activated.paramMap.subscribe((x) => {
			this.site
				.getCategory(x.get('slug'))
				.pipe(take(1))
				.subscribe((x) => {
					this.site.products.next(x);
				});
		});
	}
}
