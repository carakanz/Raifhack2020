import { Component, Input, OnInit } from '@angular/core';
import { SiteService } from '../../../core/services/site.service';

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
	@Input()
	set id(value: number) {
		this.site.getImage(value).subscribe((x) => {
			this.image = x;
		});
	}
	public image: Blob;
	@Input()
	public imageClass: string;
	constructor(private readonly site: SiteService) {}

	ngOnInit(): void {}
}
