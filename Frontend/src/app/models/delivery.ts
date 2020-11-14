export interface Delivery {
	type: 'selfCarriage' | 'courier' | 'post';
	cost: number;
	description: string;
}
