import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	public isShown: boolean;

	constructor() {}

	public show(): void {
		this.isShown = true;
	}

	public hide(): void {
		this.isShown = false;
	}
}
