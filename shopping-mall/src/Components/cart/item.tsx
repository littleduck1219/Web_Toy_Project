import { useMutation } from "@tanstack/react-query";
import { CartType } from "../../graphqlType";
import { QueryKeys, getClient, graphqlFetcher } from "../../queryClient";
import { UPDATE_CART } from "../../graphql/cart";
import { SyntheticEvent } from "react";

export const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
	const queryClient = getClient();
	const { mutate: updateCart } = useMutation(
		({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }),
		{
			onMutate: async ({ id, amount }) => {
				await queryClient.cancelQueries([QueryKeys.CART]);
				// Snapshot the previous value
				const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>([QueryKeys.CART]);
				if (!prevCart?.[id]) return prevCart;

				const newCart = {
					...(prevCart || {}),
					[id]: { ...prevCart[id], amount },
				};
				queryClient.setQueryData([QueryKeys.CART], newCart);
				return prevCart;
			},
			onSuccess: (newValue) => {
				const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>([QueryKeys.CART]);
				const newCart = {
					...(prevCart || {}),
					[id]: newValue,
				};
				queryClient.setQueryData([QueryKeys.CART], newCart);
			},
		}
	);

	const handleUpdateAmount = (e: SyntheticEvent) => {
		const amount = Number((e.target as HTMLInputElement).value);
		updateCart({ id, amount });
		// updateCart(
		// 	{ id, amount },
		// 	{
		// 		onSuccess: (newValue) => {
		// 			const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>([QueryKeys.CART]);
		// 			const newCart = {
		// 				...(prevCart || {}),
		// 				...newValue,
		// 			};
		// 			queryClient.setQueryData([QueryKeys.CART], newCart);
		// 		},
		// 		// queryClient.setQueryData([QueryKeys.CART]),
		//
		// 	}
		// );
	};
	// queryClient.invalidateQueries([QueryKeys.CART]),
	// invalidateQueries : 틀린데이터를 다시 요청함
	return (
		<li className='cart-item'>
			<img className='cart-item__image' src={imageUrl} />
			<p className='cart-item__price'>{price}</p>
			<p className='cart-item__title'>{title}</p>
			<input type='number' className='cart-item__amount' value={amount} onChange={handleUpdateAmount} />
		</li>
	);
};
