import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class SessionService {
	public get authorized(): boolean {
		return !!this.token;
	}

	private token: string;
	constructor() {}

	public saveToken(token: string): void {
		this.token = token;
		this.save('token', token);
	}

	public save(key: string, value: any): void {
		localStorage.setItem(key, value);
	}

	public getToken(): string {
		return this.get('token');
	}

	public get(key: string): any {
		return localStorage.getItem(key);
	}
}
