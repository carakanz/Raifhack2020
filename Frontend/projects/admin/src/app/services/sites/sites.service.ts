import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SiteInterface} from "./interfaces/site.interface";
import {CategoriesInterface} from "./interfaces/categories.interface";
import {ProductInterface} from "./interfaces/product.interface";

@Injectable({
	providedIn: 'root'
})
export class SitesService {

	constructor(private http: HttpClient) {}

	public getSites$(): Observable<SiteInterface[]> {
		return of([
			{ siteId: 1, name: 'jhdsgfhj', type: 'shop', slug: 'fhkgdksgh' },
			{ siteId: 2, name: 'gkfdjhdkhgk', type: 'shop', slug: 'hksfghkjs' },
			{ siteId: 3, name: 'dhgfkjhd', type: 'shop', slug: 'bdfkjghd'},
			{ siteId: 4, name: 'sgfkjsh', type: 'shop', slug: 'gskjfh'},
			{ siteId: 5, name: 'gkjhdj', type: 'shop', slug: 'dshfjklsj'},
		])
	}

	public getCategories$(): Observable<CategoriesInterface[]> {
		return of([
			{ id: 1, siteId: 1, slug: 'klxvl', name: 'kfdhkls' },
			{ id: 1, siteId: 1, slug: 'jhkfj', name: 'gksjdh' },
			{ id: 1, siteId: 1, slug: 'dsklg', name: 'dfnlvf' },
			{ id: 1, siteId: 1, slug: 'vdffd', name: 'dfgdgdfgd' },
		])
	}

	public getProducts$(): Observable<ProductInterface[]> {
		return of([
			{
				id: 1,
				name: 'kljljkljk',
				categories: { id: 1, siteId: 1, slug: 'klxvl', name: 'kfdhkls' },
				cost: 465,
				description: 'gkjhkj',
			},
			{
				id: 2,
				name: 'kljljkljk',
				categories: { id: 1, siteId: 1, slug: 'klxvl', name: 'kfdhkls' },
				cost: 465,
				description: 'gkjhkj',
			},
			{
				id: 3,
				name: 'kljljkljk',
				categories: { id: 1, siteId: 1, slug: 'klxvl', name: 'kfdhkls' },
				cost: 465,
				description: 'gkjhkj',
			},
			{
				id: 4,
				name: 'kljljkljk',
				categories: { id: 1, siteId: 1, slug: 'klxvl', name: 'kfdhkls' },
				cost: 465,
				description: 'gkjhkj',
			}
		])
	}
}
