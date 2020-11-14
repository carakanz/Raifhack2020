import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormsConfig} from "./config/forms.config";

@Component({
	selector: 'app-create-and-edit-site',
	templateUrl: './create-and-edit-site.component.html',
	styleUrls: ['./create-and-edit-site.component.scss']
})
export class CreateAndEditSiteComponent implements OnInit {
	public mainForm: FormGroup;
	public categoryForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
	) {
	}

	ngOnInit(): void {

	}
}
