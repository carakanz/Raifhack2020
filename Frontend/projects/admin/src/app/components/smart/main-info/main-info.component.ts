import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsConfig} from "../create-and-edit-site/config/forms.config";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
	selector: 'app-main-info',
	templateUrl: './main-info.component.html',
	styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit {
	public mainForm: FormGroup;
	public siteTypes = FormsConfig.siteTypes;
	public deliveryTypes = FormsConfig.deliveryTypes;

	public get deliveryFormArrays(): FormArray {
		return this.mainForm.get('delivery') as FormArray;
	}

	constructor(
		private formBuilder: FormBuilder,
		private cdRef: ChangeDetectorRef,
	) {
	}

	ngOnInit(): void {
		this.mainForm = this.formBuilder.group({
			...FormsConfig.siteMainForm,
			delivery: this.formBuilder.array([
				this.formBuilder.group(FormsConfig.deliveryInfo),
			]),
		});
	}

	public addNewDeliveryInfo(): void {
		const newDeliveryForm = this.formBuilder.group(FormsConfig.deliveryInfo);

		this.deliveryFormArrays.push(newDeliveryForm);
		this.cdRef.detectChanges();
	}
}
