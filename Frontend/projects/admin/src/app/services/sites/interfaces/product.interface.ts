import { CategoriesInterface } from './categories.interface';

export interface ProductInterface {
	name: string;
	categories: CategoriesInterface;
	cost: number;
	description: string;
}
