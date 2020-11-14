import { Component, OnDestroy, OnInit } from '@angular/core';
import { SiteService } from './modules/core/services/site.service';
import { Subscription } from 'rxjs';
import { LoaderService } from './modules/core/services/loader.service';
import { filter, take } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	private sub: Subscription = Subscription.EMPTY;
	public logo: Blob;

	constructor(
		public readonly site: SiteService,
		public readonly loader: LoaderService,
		private readonly title: Title
	) {}

	public ngOnInit(): void {
		this.loader.show();
		this.site.site.next(window.location.host.split('.')[0]);

		this.sub = this.site.site.pipe(filter((x) => !!x)).subscribe((x) => {
			this.site
				.getSite()
				.pipe(take(1))
				.subscribe((y) => {
					this.loader.hide();
					this.site.currentSite.next(y);
					this.title.setTitle('Mango' + ' | ' + y.name);
				});
			this.site
				.getLogo()
				.pipe(take(1))
				.subscribe((y) => {
					this.logo = y;
					this.site.logo.next(y);
				});
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
