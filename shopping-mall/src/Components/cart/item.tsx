import { useMutation } from "@tanstack/react-query";
import { CartType } from "../../graphqlType";
import { graphqlFetcher } from "../../queryClient";
import { UPDATE_CART } from "../../graphql/cart";
import { SyntheticEvent } from "react";

export const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
	const { mutate: updateCart } = useMutation(({ id, amount }: { id: string; amount: number }) =>
		graphqlFetcher(UPDATE_CART, { id, amount })
	);

	const handleUpdataAmount = (e: SyntheticEvent) => {
		const value = Number(e.target as HTMLInputElement).value;
		updateCart({ id, value });
	};

	return (
		<li className='cart-item'>
			<img src={imageUrl} />
			<p>{price}</p>
			<p>{title}</p>
			<input type='number' className='cart-item__amount' value={amount} onChange={handleUpdataAmount} />
		</li>
	);
};
