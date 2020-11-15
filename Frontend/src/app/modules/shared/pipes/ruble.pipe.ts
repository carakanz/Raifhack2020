import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'ruble',
})
export class RublePipe implements PipeTransform {
	private readonly format = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

	transform(value: number): string {
		return this.format.format(value / 100);
	}
}
