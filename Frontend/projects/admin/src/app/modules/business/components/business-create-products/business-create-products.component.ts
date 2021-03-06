import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { BASE_DOMAIN } from '../../../../tokens';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-business-create-products',
	templateUrl: './business-create-products.component.html',
	styleUrls: ['./business-create-products.component.scss'],
})
export class BusinessCreateProductsComponent implements OnInit {
	public formGroup: FormGroup;

	constructor(
		private readonly formBuilder: FormBuilder,
		public readonly data: DataService,
		@Inject(BASE_DOMAIN) private readonly baseDomain: string
	) {
		this.formGroup = formBuilder.group({
			name: '',
			cost: '',
			description: '',
		});
	}

	ngOnInit(): void {}

	public fill(): void {
		this.formGroup.setValue({
			name: 'Борщ с пампушками',
			cost: 100,
			description: 'Лучший борщ в вашей жизни',
		});
	}

	public fill1(): void {
		this.formGroup.setValue({
			name: 'Детская стоматология',
			cost: 3000,
			description: 'Позаботимся о ваших зубках',
		});
	}

	public submit(): void {
		this.data.category.pipe(take(1)).subscribe((x) => {
			this.data
				.createProduct({
					...this.formGroup.value,
					cost: Number(this.formGroup.value.cost) * 100,
					categoryId: x.id,
				})
				.pipe(take(1))
				.subscribe(() => {
					this.data.create.pipe(take(1)).subscribe((z) => {
						const port = z.type === 'shop' ? 4200 : 4201;
						this.data.create.pipe(take(1)).subscribe((y) => {
							window.open('http://' + y.slug + '.' + this.baseDomain + ':' + port, '_blank');
						});
					});
				});
		});
	}
}
