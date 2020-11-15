import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	public isShown = true;
	constructor() {}

	public show(auto: boolean = false): void {
		this.isShown = true;

		if (auto) {
			of(false)
				.pipe(delay(1000))
				.pipe(take(1))
				.subscribe((x) => {
					this.isShown = x;
				});
		}
	}

	public hide(): void {
		this.isShown = false;
	}
}
