import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
	selector: 'app-categories-forms',
	templateUrl: './categories-forms.component.html',
	styleUrls: ['./categories-forms.component.scss'],
})
export class CategoriesFormsComponent implements OnInit {
	public categoriesForm: FormGroup;

	public get categoriesFormArray(): FormArray {
		return this.categoriesForm.get('categories') as FormArray;
	}

	constructor(
		private formBuilder: FormBuilder,
		private cdRef: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.categoriesForm = this.formBuilder.group({
			categories: this.formBuilder.array([this.getCategoryForm()]),
		});
	}

	public createNewCategory(): void {
		this.categoriesFormArray.push(this.getCategoryForm());
		this.cdRef.detectChanges();
	}

	private getCategoryForm(): FormGroup {
		return this.formBuilder.group({
			name: '',
			slug: '',
		});
	}
}
