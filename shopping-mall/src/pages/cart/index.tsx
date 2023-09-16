import { useQuery } from "@tanstack/react-query";
import { QueryKeys, graphqlFetcher } from "../../queryClient";
import { GET_CART } from "../../graphql/cart";
import { CartList } from "../../Components/cart";
import { CartType } from "../../graphqlType";

const Cart = () => {
	const { data } = useQuery([QueryKeys.CART], () => graphqlFetcher(GET_CART));
	const cartItems = Object.values(data || ({} as CartType[]));

	if (!cartItems.length) return <div>장바구니가 비었어요</div>;
	return <CartList items={cartItems} />;
};
export default Cart;
