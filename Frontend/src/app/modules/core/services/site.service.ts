import { Inject, Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, switchMap, take } from 'rxjs/operators';
import { API_URL } from '../tokens/api-url';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';
import { Site } from '../../../models/site';

@Injectable({
	providedIn: 'root',
})
export class SiteService {
	public readonly site: ReplaySubject<string> = new ReplaySubject<string>(1);
	public readonly currentSite: ReplaySubject<Site> = new ReplaySubject<Site>(1);
	public readonly logo: ReplaySubject<Blob> = new ReplaySubject<Blob>(1);
	public readonly banner: ReplaySubject<any> = new ReplaySubject<Blob>(1);
	public readonly products: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);
	public readonly categories: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);

	constructor(private readonly http: HttpClient, @Inject(API_URL) private readonly api: string) {
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
		this.site.subscribe((x) => {
			switch (x) {
				case 'medsi':
					this.banner.next('https://k50-a.akamaihd.net/k50/medsi/bg.jpg');
					break;
				case 'veryfood':
					this.banner.next('http://veryfood.ru/images/b0.jpg');
					break;
			}
		});
	}

	public get(path: string, options?: any): Observable<any> {
		return this.site.pipe(
			take(1),
			switchMap((x) => {
				return this.http.get('http://' + x + '.' + this.api + '/' + path, options);
			})
		);
	}
	public post(path: string, body: any, options?: any): Observable<any> {
		return this.site.pipe(
			take(1),
			switchMap((x) => {
				return this.http.post('http://' + x + '.' + this.api + '/' + path, body, options);
			})
		);
	}

	public buy(id: number): Observable<any> {
		return of(true);
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
				id: 1,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
			{
				id: 1,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
			{
				id: 1,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
			{
				id: 1,
				name: 'Тестовое название',
				description: 'Краткое описание',
				cost: 20000,
				image: [1],
			},
			{
				id: 1,
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
						};
					case 'veryfood':
						return {
							name: 'Veryfood',
							phone: '798981212',
							address: 'Тестоввя улица, дом 5',
							description: 'Доставка вкусных обедов',
						};
				}
			})
		);
		// return this.get('');
	}
}
