import {Component, OnInit} from '@angular/core';
import {SitesService} from "../../../services/sites/sites.service";
import {Observable} from "rxjs";
import {CategoriesInterface} from "../../../services/sites/interfaces/categories.interface";
import {ProductInterface} from "../../../services/sites/interfaces/product.interface";
import {ProductFormDialogComponent} from "./product-form-dialog/product-form-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
	selector: 'app-products-form',
	templateUrl: './products-form.component.html',
	styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
	public categories$: Observable<CategoriesInterface[]>;
	public products$: Observable<ProductInterface[]>

	constructor(
		private sitesService: SitesService,
		public dialog: MatDialog,
	) {}

	ngOnInit(): void {
		this.products$ = this.sitesService.getProducts$();
	}

	public openDialog(product?: ProductInterface): void {
		const dialogRef = this.dialog.open(ProductFormDialogComponent, {
			width: '500px',
			data: product
		});

		dialogRef.afterClosed().subscribe(result => {
			this.sitesService.updateProducts(result);
		});
	}

	public deleteProduct(product: ProductInterface): void {
		this.sitesService.deleteProduct(product)
	}
}
