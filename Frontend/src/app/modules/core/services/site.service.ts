import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { API_URL } from '../tokens/api-url';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';
import { Site } from '../../../models/site';
import { BuyRequest } from '../../../models/buy-request';
import { BuyResponse } from '../../../models/buy-response';

declare var PaymentPageSdk: any;

@Injectable({
	providedIn: 'root',
})
export class SiteService {
	public slug: string;
	public logoSync: string;
	public readonly site: ReplaySubject<string> = new ReplaySubject<string>(1);
	public readonly currentSite: ReplaySubject<Site> = new ReplaySubject<Site>(1);
	public readonly logo: ReplaySubject<any> = new ReplaySubject<any>(1);
	public readonly banner: ReplaySubject<any> = new ReplaySubject<any>(1);
	public readonly products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
	public readonly categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
	public readonly product: ReplaySubject<Product> = new ReplaySubject<Product>(1);
	public readonly basket: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

	constructor(private readonly http: HttpClient, @Inject(API_URL) private readonly api: string) {
		this.logo.subscribe((x) => {
			this.logoSync = x;
		});
		this.site.subscribe((x) => {
			this.slug = x;
			switch (x) {
				case 'medsi':
					this.banner.next('https://k50-a.akamaihd.net/k50/medsi/bg.jpg');
					break;
				case 'veryfood':
					this.banner.next('http://veryfood.ru/images/b0.jpg');
					break;
			}
		});
		this.basket.subscribe((x) => {
			if (x.length === 0) return;
			localStorage.setItem('basket', JSON.stringify(Array.from(new Set(x.map((y) => y.id)))));
		});
	}

	public add(item: Product): void {
		this.basket.pipe(take(1)).subscribe((x) => {
			if (x.findIndex((y) => y.id === item.id) < 0) {
				this.basket.next([...x, item]);
			}
		});
	}

	public get(path: string, options?: any): Observable<any> {
		return this.http.get(this.api + '/' + path, options);
	}
	public post(path: string, body: any, options?: any): Observable<any> {
		return this.http.post(this.api + '/' + path, body, options);
	}

	public getProduct(id: number): Observable<Product> {
		return of({
			id,
			name: 'Тестовое название',
			description: 'Краткое описание',
			cost: 20000,
			image: [1],
		});

		// return this.get('Product/get/' + id);
	}

	public buy(request: BuyRequest): Observable<BuyResponse> {
		return this.currentSite.pipe(
			take(1),
			map((x) => x.id),
			switchMap((x) =>
				this.post('Order/Create', {
					...request,
					shopId: x,
				})
			)
		);
	}

	public buyEcom(request: BuyRequest): Observable<BuyResponse> {
		return this.buy(request).pipe(
			take(1),
			tap(({ amount, orderId, publicId }) => {
				const paymentPage = new PaymentPageSdk(publicId, {
					url: 'https://test.ecom.raiffeisen.ru/pay',
				});

				const r = {
					amount: amount / 100,
					orderId,
					successUrl: 'http://' + window.location.host + '/payment/success?orderId=' + orderId,
					failUrl: 'http://' + window.location.host + '/payment/error?orderId=' + orderId,
					comment: 'Тестовая оплата',
				};

				paymentPage.replace(r);
			})
		);
	}

	public getLogo(): Observable<any> {
		return this.site.pipe(
			map((x) => {
				switch (x) {
					case 'medsi':
						return 'https://medsi.ru/local/templates/medsi/img/logo_v2-1.png';
					case 'veryfood':
						return 'http://veryfood.ru/images/employeecontrol/logo_with_mask.png';
				}
			})
		);
		// return this.get('logo', { responseType: 'blob' });
	}

	public getCategories(): Observable<Category[]> {
		return this.get('category');
	}

	public getCategory(id: number): Observable<Category> {
		return this.get('category/get/' + id).pipe(tap((x) => this.products.next(x.products)));
	}

	public getImage(id: number): Observable<any> {
		return this.site.pipe(
			map((x) => {
				switch (x) {
					case 'medsi':
						return 'https://medi.spb.ru/assets/pics/23/23.jpg';
					case 'veryfood':
						return 'https://eda.ru/img/eda/1200x-i/s2.eda.ru/StaticContent/Photos/120213174921/1202131749503/p_O.jpg';
				}
			})
		);
		// return this.get('image/' + id, { responseType: 'blob' });
	}
	public getSite(): Observable<any> {
		return this.site.pipe(
			take(1),
			switchMap((x) => {
				return this.get('Sites/get/' + x).pipe(
					take(1),
					tap((y) => {
						this.currentSite.next(y);
						this.categories.next(y.categories);
					})
				);
			})
		);
	}
}
