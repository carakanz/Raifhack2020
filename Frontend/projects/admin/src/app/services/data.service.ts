import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	public readonly create: ReplaySubject<any> = new ReplaySubject<any>(1);
	public readonly category: ReplaySubject<any> = new ReplaySubject<any>(1);

	constructor(private readonly http: HttpClient) {}
}
