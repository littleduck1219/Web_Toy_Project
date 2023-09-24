import { useMutation } from "@tanstack/react-query";
import { CartType } from "../../graphqlType";
import { QueryKeys, getClient, graphqlFetcher } from "../../queryClient";
import { DELETE_CART, UPDATE_CART } from "../../graphql/cart";
import { ForwardedRef, SyntheticEvent, forwardRef } from "react";

const CartItem = ({ id, imageUrl, price, title, amount }: CartType, ref: ForwardedRef<HTMLInputElement>) => {
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
		if (amount < 1) return;
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

	const { mutate: deleteCart } = useMutation(({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }), {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.CART]);
		},
	});

	const handleDeleteItem = () => {
		deleteCart({ id });
	};
	return (
		<li className='cart-item'>
			<input className='cart-item__checkbox' type='checkbox' name={`select-item_${id}`} />
			<img className='cart-item__image' src={imageUrl} />
			<p className='cart-item__price'>{price}</p>
			<p className='cart-item__title'>{title}</p>
			<input className='cart-item__amount' type='number' value={amount} onChange={handleUpdateAmount} />
			<button className='cart-item__button' type='button' onClick={handleDeleteItem}>
				삭제
			</button>
		</li>
	);
};

export default forwardRef(CartItem);
