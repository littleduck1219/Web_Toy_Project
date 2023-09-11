// src/mocks/handlers.js
import { graphql } from "msw";
import { v4 as uuid } from "uuid";
import { GET_PRODUCT, GET_PRODUCTS } from "../graphql/products";

const mock_products = Array.from({ length: 20 }).map((_, i) => ({
	id: uuid(),
	imageUrl: `https://loremflickr.com/640/480?random=${i + 1}`,
	price: 50000,
	title: `임시상품${i + 1}`,
	description: `임시상품상세내용${i + 1}`,
	creactedAt: new Date(1694461295180 + i * 1000 * 60).toString(),
}));

export const handlers = [
	graphql.query(GET_PRODUCTS, (req, res, ctx) => {
		return res(
			ctx.data({
				products: mock_products,
			})
		);
	}),
	graphql.query(GET_PRODUCT, (req, res, ctx) => {
		return res(ctx.data(mock_products[0]));
	}),
];
