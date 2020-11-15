import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-business-create-template',
	templateUrl: './business-create-template.component.html',
	styleUrls: ['./business-create-template.component.scss'],
})
export class BusinessCreateTemplateComponent implements OnInit {
	public formGroup: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private readonly data: DataService,
		private readonly router: Router,
		private readonly activated: ActivatedRoute
	) {
		this.formGroup = this.formBuilder.group({
			type: '',
		});
	}

	ngOnInit(): void {}

	public submit(): void {
		this.data.create.pipe(take(1)).subscribe((x) => {
			this.data.create.next({
				...this.formGroup.value,
				...x,
			});
			this.router.navigate(['../category'], {
				relativeTo: this.activated,
			});
		});
	}
}
