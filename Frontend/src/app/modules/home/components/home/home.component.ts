import { AfterViewChecked, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	constructor(public readonly site: SiteService, public readonly router: Router) {}

	ngOnInit(): void {
		this.site.categories
			.pipe(
				filter((x) => !!x && x.length > 0),
				take(1)
			)
			.subscribe((x) => {
				this.router.navigate(['categories', x[0].slug]);
			});
	}
}
