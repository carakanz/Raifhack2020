import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { filter } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'admin';

	constructor(public readonly loader: LoaderService, private readonly router: Router) {}

	ngOnInit() {
		this.router.events.pipe(filter((x) => x instanceof NavigationStart)).subscribe((x) => {
			this.loader.show(true);
		});
	}
}
