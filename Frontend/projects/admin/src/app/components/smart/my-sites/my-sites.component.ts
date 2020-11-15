import {Component, OnInit} from '@angular/core';
import {SitesService} from "../../../services/sites/sites.service";
import {Observable} from "rxjs";
import {SiteInterface} from "../../../services/sites/interfaces/site.interface";

@Component({
	selector: 'app-my-sites',
	templateUrl: './my-sites.component.html',
	styleUrls: ['./my-sites.component.scss']
})
export class MySitesComponent implements OnInit {
	public sites$: Observable<SiteInterface[]>;

	constructor(private sitesService: SitesService) {
	}

	ngOnInit(): void {
		this.sites$ = this.sitesService.getSites$();
	}

	public deleteProduct(site: SiteInterface): void {
		this.sitesService.deleteSite(site);
	}

	public trackById(index: number, { siteId }: SiteInterface): number {
		return siteId;
	}
}
