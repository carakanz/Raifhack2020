import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter, map, take, tap } from 'rxjs/operators';
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
					this.categories.next([
						{
							name: 'Вакцинация',
							slug: 'first',
						},
						{
							name: 'Стоматология',
							slug: 'second',
						},
					]);
					break;
				case 'veryfood':
					this.banner.next('http://veryfood.ru/images/b0.jpg');
					this.categories.next([
						{
							name: 'Первое',
							slug: 'first',
						},
						{
							name: 'Второе',
							slug: 'second',
						},
					]);
					break;
			}
		});
		this.basket.subscribe((x) => {
			if (x.length === 0) return;
			localStorage.setItem('basket', JSON.stringify(new Set(x.map((y) => y.id))));
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
		return of({
			publicId: '000003333328007-33328007',
			amount: 200,
			orderId: 1234,
		});
		// return this.post('Basket/Buy', request);
	}

	public buyEcom(request: BuyRequest): Observable<BuyResponse> {
		const obs = of({
			publicId: '000003333328007-33328007',
			amount: 200,
			orderId: 1234,
		});
		// const obs = this.post('Basket/Buy', request);

		return obs.pipe(
			tap(({ amount, orderId, publicId }) => {
				const paymentPage = new PaymentPageSdk(publicId, {
					url: 'https://test.ecom.raiffeisen.ru/pay',
				});
				paymentPage.replace({
					amount,
					orderId,
					successUrl:
						'http://' +
						window.location.host +
						':' +
						window.location.port +
						'/payment/success?orderId=' +
						'91700',
					failUrl:
						'http://' +
						window.location.host +
						':' +
						window.location.port +
						'/payment/success?orderId=' +
						'91700',
					extra: {
						...request,
					},
					style: {
						header: {
							logo: this.logoSync,
							titlePlace: 'right',
						},
					},
				});
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

	public getCategory(slug: string): Observable<Product[]> {
		return of([
			{
				id: 1,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
			{
				id: 2,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
			{
				id: 3,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
			{
				id: 4,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
			{
				id: 5,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
			{
				id: 6,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
		]);
		// return this.get('category/' + slug);
	}

	public getImage(id: number): Observable<any> {
		return this.site.pipe(
			map((x) => {
				switch (x) {
					case 'medsi':
						return 'https://static.irk.ru/media/img/site/gallery/30474/1c299f89-8347-4c73-b462-2f309da635fd_jpg_800x600_x-False_q85.jpg';
					case 'veryfood':
						return 'https://lh3.googleusercontent.com/proxy/LoBje7qCPs_R7MarYXCYKBROPxdHSlEIgqU-m7J6Jq5k_kMgqCUV53ac1Yirjnj1VTjC-52zsD4zW3kXUsu3W2THac-VlehzRtPBZ3GBKiB4i1DsVphPMR7Ch-AvF_Xvw04';
				}
			})
		);
		// return this.get('image/' + id, { responseType: 'blob' });
	}
	public getSite(): Observable<any> {
		return this.site.pipe(
			map((x) => {
				switch (x) {
					case 'medsi':
						return {
							name: 'МЕДСИ',
							phone: '798981212',
							address: 'Тестоввя улица, дом 5',
							description: 'Медицина компетенций',
							type: 'medicine',
						};
					case 'veryfood':
						return {
							name: 'Veryfood',
							phone: '798981212',
							address: 'Тестоввя улица, дом 5',
							description: 'Доставка вкусных обедов',
							type: 'shop',
						};
				}
			})
		);

		// return this.site.pipe(
		// 	take(1),
		// 	switchMap((x) => {
		// 		return this.get('Sites/get/' + x);
		// 	})
		// );
	}
}
