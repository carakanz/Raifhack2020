import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';
import { Product } from '../../../../models/product';
import { map, take } from 'rxjs/operators';
import { combineLatest, zip } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-basket',
	templateUrl: './basket.component.html',
	styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
	public formGroup: FormGroup;
	constructor(public readonly site: SiteService, private readonly builder: FormBuilder) {
		this.formGroup = builder.group({
			name: '',
			phone: '',
			address: '',
			email: '',
			dateTime: '',
		});
	}

	ngOnInit(): void {
		const saved: string[] = JSON.parse(localStorage.getItem('basket'));
		const n = Array.from(new Set(saved?.map((z) => Number(z))));
		const obs = n.map((x) => this.site.getProduct(x).pipe(take(1)));

		combineLatest(obs).subscribe((x) => {
			this.site.basket.pipe(take(1)).subscribe((y) => {
				console.log(y);
				const m = x.filter((t) => !y.includes(t));
				this.site.basket.next([...y, ...m]);
			});
		});
	}

	public remove(item: Product): void {
		this.site.basket.pipe(take(1)).subscribe((x) => {
			this.site.basket.next(x.filter((y) => y !== item));
		});
	}

	public buy(): void {
		this.site.basket
			.pipe(
				take(1),
				map((x) => x.map((y) => y.id))
			)
			.subscribe((x) => {
				this.site.buyEcom({
					address: this.formGroup.value.address,
					dateTime: this.formGroup.value.dateTime,
					email: this.formGroup.value.email,
					name: this.formGroup.value.name,
					phone: this.formGroup.value.phone,
					products: x,
				});
			});
	}
}