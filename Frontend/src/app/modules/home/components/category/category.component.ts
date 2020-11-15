import { Component, Input, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';
import { GoodComponent } from '../good/good.component';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
	constructor(
		public readonly site: SiteService,
		private readonly activated: ActivatedRoute,
		private readonly modal: MatDialog
	) {}

	ngOnInit(): void {
		this.activated.paramMap.subscribe((x) => {
			this.site
				.getCategory(Number(x.get('slug')))
				.pipe(take(1))
				.subscribe((y) => {
					this.site.products.next(y.products);
				});
		});
	}

	public select(item: Product): void {
		this.site.product.next(item);
		this.site.currentSite
			.pipe(
				take(1),
				map((x) => x.type)
			)
			.subscribe((x) => {
				switch (x) {
					case 'medicine':
						this.modal.open(ProductComponent, {
							maxWidth: 800,
							minWidth: 500,
						});
						break;
					case 'shop':
						this.modal.open(GoodComponent, {
							maxWidth: 800,
							minWidth: 500,
						});
						break;
				}
			});
	}
}
