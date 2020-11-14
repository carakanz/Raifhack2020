import { Inject, Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';
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
		this.banner.next('http://veryfood.ru/images/b0.jpg');
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
		return of('http://veryfood.ru/images/employeecontrol/logo_with_mask.png');
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

	public getImage(id: number): Observable<Blob> {
		return this.get('image/' + id, { responseType: 'blob' });
	}
	public getSite(): Observable<any> {
		return of({
			name: 'Veryfood',
			phone: '798981212',
			address: 'Тестоввя улица, дом 5',
			description: 'Доставка вкусных обедов',
		});
		// return this.get('');
	}
}
