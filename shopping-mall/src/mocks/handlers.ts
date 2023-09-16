// src/mocks/handlers.js
import { graphql } from "msw";
import { GET_PRODUCT, GET_PRODUCTS } from "../graphql/products";
import { ADD_CART, GET_CART } from "../graphql/cart";
import { CartType } from "../graphqlType";

const mockProducts = (() =>
	Array.from({ length: 20 }).map((_, i) => ({
		id: i + 1 + "",
		imageUrl: `https://loremflickr.com/640/480?random=${i + 1}`,
		price: 50000,
		title: `임시상품${i + 1}`,
		description: `임시상품상세내용${i + 1}`,
		createdAt: new Date(1694461295180 + i * 1000 * 60).toString(),
	})))();

let cartData: { [key: string]: CartType } = (() => ({}))();

export const handlers = [
	graphql.query(GET_PRODUCTS, (req, res, ctx) => {
		return res(
			ctx.data({
				products: mockProducts,
			})
		);
	}),
	graphql.query(GET_PRODUCT, (req, res, ctx) => {
		const found = mockProducts.find((item) => item.id === req.variables.id);
		if (found) return res(ctx.data(found));
		return res();
	}),
	graphql.query(GET_CART, (req, res, ctx) => {
		return res(ctx.data(cartData));
	}),
	graphql.mutation(ADD_CART, (req, res, ctx) => {
		const newData = { ...cartData };
		const id = req.variables.id;
		if (newData[id]) {
			newData[id] = {
				...newData[id],
				amount: (newData[id].amount || 0) + 1,
			};
		} else {
			const found = mockProducts.find((item) => item.id === req.variables.id);
			if (found) {
				newData[id] = {
					...found,
					amount: 1,
				};
			}
		}
		cartData = newData;
		return res(ctx.data(newData));
	}),
];
