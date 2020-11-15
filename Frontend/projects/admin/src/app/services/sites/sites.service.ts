import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {SiteInterface} from "./interfaces/site.interface";
import {CategoriesInterface} from "./interfaces/categories.interface";
import {ProductInterface} from "./interfaces/product.interface";
import {DetailedSiteInterface} from "./interfaces/detailed-site.interface";
import {DeliveryInterface} from "./interfaces/delivery.interface";

@Injectable({
	providedIn: 'root',
})
export class SitesService {
	private sites$ = new BehaviorSubject<SiteInterface[]>([
		{
			name: 'Шава от мамы', type: 'food',
			slug: 'shavermatop', siteId: 1
		},
		{
			name: 'Магазин у дома', type: 'shop',
			slug: 'houseshop', siteId: 2
		},
		{
			name: 'Столовая МФТИ', type: 'food',
			slug: 'veryfood', siteId: 3
		},
		{
			name: 'Блинная', type: 'food',
			slug: 'bliny', siteId: 4
		},
		{
			name: 'Бургерная Котлета', type: 'food',
			slug: 'kotleta', siteId: 5
		}
	]);

	private products$ = new BehaviorSubject([
		{

			id: 1,
			name: 'Шаверма с курицей обыкновенная',
			categories: {id: 1, siteId: 1, slug: 'shava_chicken', name: 'Шаверма с курицей'},
			cost: 150,
			description: 'Шаверма обыкновенного вида, но необыкновенного вкуса! Так и тает во рту!',
		},
		{
			id: 2,
			name: 'Шаверма с добавлением топингов',
			categories: {id: 1, siteId: 1, slug: 'shava_chicken', name: 'Шаверма с курицей'},
			cost: 200,
			description: 'В добавление к обычной шаверме с курицей идут топинги на выбор',

		},
		{
			id: 3,
			name: 'Шаверма от Шефа',
			categories: {id: 1, siteId: 1, slug: 'shava_chicken', name: 'Шаверма с курицей'},
			cost: 220,
			description: 'Шаверма с секретным соусом от нашего Шеф повара',
		},

		{
			id: 4,
			name: 'Шава для мамы',
			categories: {id: 1, siteId: 1, slug: 'shava_chicken', name: 'Шаверма с курицей'},
			cost: 250,
			description: 'Коронное блюдо нашей точки, такого вы не пробовали! Попробовав раз, не сможете остановиться!',
		}
	]);

	constructor(private http: HttpClient) {
	}

	public getSites$(): Observable<SiteInterface[]> {
		return this.sites$.asObservable();
	}

	public getSiteInfo$(id: number): Observable<DetailedSiteInterface> {
		return of({
			name: 'jfld',
			type: 'kdfgf',
			slug: 'vldfkjg',
			description: 'nvkldf',
			phone: 'glkd',
			address: 'kdf',
			delivery: [
				{
					type: 'klds',
					cost: 'fjkls',
					description: 'bjkff',
				},
				{
					type: 'kldvjds',
					cost: 'fjkls',
					description: 'bjkff',
				},
			],
		})
	}

	public createSite(site: SiteInterface): void {
		const newSites = [...this.sites$.value, site];

		this.sites$.next(newSites);
	}

	public deleteSite({siteId: deletingId}: SiteInterface): void {
		const newSites = this.sites$.value.filter(
			({siteId}: SiteInterface) => siteId !== deletingId);

		this.sites$.next(newSites);
	}

	public getCategories$(): Observable<CategoriesInterface[]> {
		return of([
			{id: 1, siteId: 1, slug: 'shava_chicken', name: 'Шаверма с курицей'},
			{id: 2, siteId: 1, slug: 'shava_vegan', name: 'Веганская шаверма'},
			{id: 3, siteId: 1, slug: 'soup', name: 'Супы'},
			{id: 4, siteId: 1, slug: 'donut', name: 'Пончики'},
		])
	}

	public getProducts$(): Observable<ProductInterface[]> {
		return this.products$.asObservable();
	}

	public updateProducts(someProduct: ProductInterface): void {
		if (someProduct.id) {
			const newProducts = this.products$.value.map(product => {
				if (product.id === someProduct.id) {
					return someProduct;
				}

				return product;
			});

			this.products$.next(newProducts);

			return;
		}

		const newProducts = [...this.products$.value, someProduct];

		this.products$.next(newProducts);
	}

	public deleteProduct({ id: deletingId }: ProductInterface): void {
		const newProducts = this.products$.value.filter(({ id }: ProductInterface) => deletingId !== id);

		this.products$.next(newProducts);
	}
}
