import {Validators} from "@angular/forms";
import {DeliveryInterface} from "./delivery.interface";

export interface DetailedSiteInterface {
	name: string;
	type: string;
	slug: string;
	description: string;
	phone: string;
	address: string;
	delivery: DeliveryInterface[];
}
