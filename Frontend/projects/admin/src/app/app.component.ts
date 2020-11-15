import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { filter, take } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'admin';
	sites: any[];

	constructor(
		public readonly loader: LoaderService,
		private readonly router: Router,
		private readonly data: DataService
	) {}

	ngOnInit() {
		this.router.events.pipe(filter((x) => x instanceof NavigationStart)).subscribe((x) => {
			this.loader.show(true);
		});

		this.data
			.getSites()
			.pipe(take(1))
			.subscribe((x) => {
				this.sites = x;
			});
	}
}
