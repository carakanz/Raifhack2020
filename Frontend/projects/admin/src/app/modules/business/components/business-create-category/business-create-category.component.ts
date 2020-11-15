import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-business-create-category',
	templateUrl: './business-create-category.component.html',
	styleUrls: ['./business-create-category.component.scss'],
})
export class BusinessCreateCategoryComponent implements OnInit {
	public formGroup: FormGroup;

	constructor(
		private readonly formBuilder: FormBuilder,
		public readonly data: DataService,
		private readonly router: Router,
		private readonly activated: ActivatedRoute
	) {
		this.formGroup = formBuilder.group({
			name: '',
			slug: '',
		});
	}

	ngOnInit(): void {}

	public fill(): void {
		this.formGroup.setValue({
			name: 'Супы',
			slug: 'soups',
		});
	}

	public fill1(): void {
		this.formGroup.setValue({
			name: 'Основные блюда',
			slug: 'mains',
		});
	}

	public submit(): void {
		this.data.category.next(this.formGroup.value);
		this.router.navigate(['../products'], {
			relativeTo: this.activated,
		});
	}
}
