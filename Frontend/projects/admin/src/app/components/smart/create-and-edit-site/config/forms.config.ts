import { Validators } from '@angular/forms';

export class FormsConfig {
	public static get siteMainForm() {
		return {
			name: ['', Validators.required],
			type: ['', Validators.required],
			slug: ['', Validators.required],
			description: '',
			phone: '',
			address: '',
		};
	}

	public static get deliveryInfo() {
		return {
			type: '',
			cost: '',
			description: '',
		};
	}

	public static get siteTypes() {
		return ['Магазин', 'Доставка еды', 'Сфера услуг'];
	}

	public static get deliveryTypes() {
		return ['Самовывоз', 'Курьер', 'Почта'];
	}
}
