import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {CategoriesInterface} from "../../../../services/sites/interfaces/categories.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductInterface} from "../../../../services/sites/interfaces/product.interface";
import {SitesService} from "../../../../services/sites/sites.service";

@Component({
	selector: 'app-product-form-dialog',
	templateUrl: './product-form-dialog.component.html',
	styleUrls: ['./product-form-dialog.component.scss']
})
export class ProductFormDialogComponent implements OnInit {
	public categories$: Observable<CategoriesInterface[]>;
	public form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private sitesService: SitesService,
		public dialogRef: MatDialogRef<ProductFormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ProductInterface | undefined) {
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			categories: '',
			name: '',
			cost: '',
			description: '',
		});

		if (this.data) {
			this.form.patchValue(this.data);
		}

		this.categories$ = this.sitesService.getCategories$();
	}

	public saveData(): void {
		if (this.data) {
			const { id } = this.data;

			const updatedProduct = {
				id,
				...this.form.value,
			};

			this.dialogRef.close(updatedProduct);

			return;
		}

		this.dialogRef.close(this.form.value);
	}
}
