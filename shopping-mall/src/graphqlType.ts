export type Product = {
	id: string;
	imageUrl: string;
	price: number;
	title: string;
	description: string;
	createdAt: string;
};

export type Products = {
	products: Product[];
};

export type CartType = {
	id: string;
	imageUrl: string;
	price: number;
	title: string;
	amount: number;
};
