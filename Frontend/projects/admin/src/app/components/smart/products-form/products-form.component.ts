import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SitesService} from "../../../services/sites/sites.service";
import {Observable} from "rxjs";
import {CategoriesInterface} from "../../../services/sites/interfaces/categories.interface";
import {ProductInterface} from "../../../services/sites/interfaces/product.interface";

@Component({
	selector: 'app-products-form',
	templateUrl: './products-form.component.html',
	styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
	public form: FormGroup;
	public categories$: Observable<CategoriesInterface[]>;
	public products$: Observable<ProductInterface[]>
	public isFormOpened: boolean;

	constructor(
		private formBuilder: FormBuilder,
		private sitesService: SitesService,
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			categories: '',
			name: '',
			cost: '',
			description: '',
		});

		this.categories$ = this.sitesService.getCategories$();
		this.products$ = this.sitesService.getProducts$();
	}

	public onEditClick(product: ProductInterface): void {
		this.form.patchValue(product);

		this.isFormOpened = true;
	}

}
