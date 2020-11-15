import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
		this.data.create.pipe(take(1)).subscribe((x) => {
			this.data
				.createCategory({
					...this.formGroup.value,
					siteId: x.id,
				})
				.pipe(take(1))
				.subscribe((y) => {
					console.log(y);
					this.data.category.next({
						...this.formGroup.value,
						id: y.id,
					});
					this.router.navigate(['../products'], {
						relativeTo: this.activated,
					});
				});
		});
	}
}
