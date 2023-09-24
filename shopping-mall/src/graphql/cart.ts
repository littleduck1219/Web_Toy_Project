import { gql } from "graphql-tag";

export const ADD_CART = gql`
	mutation ADD_CART($id: string) {
		id: string
		imageUrl: string
		price: number
		title: string
		amount: number
	}
`;

export const GET_CART = gql`
	query GET_CART {
		id: string
		imageUrl: string
		price: number
		title: string
		amount: number
	}
`;

export const UPDATE_CART = gql`
	mutation UPDATE_CART($id: string, $amount: number) {
		cart(id: $id, amount: $amount) {
			id
			imageUrl
			price
			title
			amount
		}
	}
`;

export const DELETE_CART = gql`
	mutation DELETE_CART($id: string) {
		id
	}
`;
