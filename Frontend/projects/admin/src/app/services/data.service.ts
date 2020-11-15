import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { API_URL } from '../tokens';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	public readonly sites: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	public readonly create: ReplaySubject<any> = new ReplaySubject<any>(1);
	public readonly category: ReplaySubject<any> = new ReplaySubject<any>(1);
	public readonly products: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	constructor(private readonly http: HttpClient, @Inject(API_URL) private readonly api: string) {}

	public post(path: string, body: any, options?: any): Observable<any> {
		return this.http.post(this.api + '/' + path, body, options);
	}
	public get(path: string, options?: any): Observable<any> {
		return this.http.get(this.api + '/' + path, options);
	}

	public createSite(req: any): Observable<any> {
		return this.post('sites/create', req);
	}

	public createCategory(req: any): Observable<any> {
		return this.post('category/create', req);
	}

	public createProduct(req: any): Observable<any> {
		return this.post('product/create', req).pipe(
			switchMap((x) =>
				this.products.pipe(
					take(1),
					tap((y) => {
						this.products.next([...y, x]);
					})
				)
			)
		);
	}

	public getSites(): Observable<any> {
		return this.get('sites/all').pipe(
			take(1),
			tap((x) => this.sites.next(x.filter((y) => ['veryfood', 'medsi'].includes(y.slug))))
		);
	}
}
