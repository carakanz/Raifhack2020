import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {SitesService} from "../../../services/sites/sites.service";

@Component({
	selector: 'app-create-and-edit-site',
	templateUrl: './create-and-edit-site.component.html',
	styleUrls: ['./create-and-edit-site.component.scss'],
})
export class CreateAndEditSiteComponent implements OnInit {
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private sitesService: SitesService,
	) {
	}

	public ngOnInit(): void {
		this.activatedRoute.paramMap
			.pipe(
				map((param) => param.get('id')),
				switchMap(id => this.sitesService.getSiteInfo$(+id)),
			);
	}

	public toMain(): void {
		this.router.navigate(['/', 'main']);
	}
}
