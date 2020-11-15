import { CategoriesInterface } from './categories.interface';

export interface ProductInterface {
	id: number;
	name: string;
	categories: CategoriesInterface;
	cost: number;
	description: string;
}
