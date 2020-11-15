import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-business-create',
	templateUrl: './business-create.component.html',
	styleUrls: ['./business-create.component.scss'],
})
export class BusinessCreateComponent implements OnInit {
	public formGroup: FormGroup;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly data: DataService,
		private readonly router: Router,
		private readonly activated: ActivatedRoute
	) {
		this.formGroup = formBuilder.group({
			name: '',
			type: '',
			slug: '',
			description: '',
			phone: '',
			address: '',
		});
	}

	ngOnInit(): void {}

	public fill(): void {
		this.formGroup.setValue({
			name: 'Veryfood',
			type: 'shop',
			slug: 'veryfood',
			description: 'Доставка вкусных обедов',
			phone: '89631234567',
			address: 'Тестовая улица, д 5',
		});
	}

	public fill1(): void {
		this.formGroup.setValue({
			name: 'МЕДСИ',
			type: 'medicine',
			slug: 'medsi',
			description: 'Медицина компетенций',
			phone: '89631234567',
			address: 'Тестовая улица, д 5',
		});
	}

	public submit(): void {
		this.data.create.next({
			...this.formGroup.value,
		});
		this.data
			.createSite(this.formGroup.value)
			.pipe(take(1))
			.subscribe((x) => {
				this.data.create.next({
					...this.formGroup.value,
					id: x.id,
				});
				this.router.navigate(['../template'], {
					relativeTo: this.activated,
				});
			});
	}
}
