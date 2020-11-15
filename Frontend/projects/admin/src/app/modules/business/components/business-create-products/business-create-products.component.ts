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
			cost: '100',
			description: 'Лучший борщ в вашей жизни',
		});
	}

	public fill1(): void {
		this.formGroup.setValue({
			name: 'Детская стоматология',
			cost: '-',
			description: 'Позаботимся о ваших зубках',
		});
	}

	public submit(): void {
		this.data.category.next(this.formGroup.value);
		this.data.create.pipe(take(1)).subscribe((x) => {
			window.open('http://' + x.slug + '.' + this.baseDomain, '_blank');
		});
	}
}
