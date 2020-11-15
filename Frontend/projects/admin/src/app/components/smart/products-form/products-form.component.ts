import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SitesService } from '../../../services/sites/sites.service';
import { Observable } from 'rxjs';
import { CategoriesInterface } from '../../../services/sites/interfaces/categories.interface';

@Component({
	selector: 'app-products-form',
	templateUrl: './products-form.component.html',
	styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
	public form: FormGroup;
	public categories$: Observable<CategoriesInterface[]>;

	constructor(private formBuilder: FormBuilder, private sitesService: SitesService) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			categories: '',
			name: '',
			cost: '',
			description: '',
		});

		this.categories$ = this.sitesService.getCategories$();
	}
}
