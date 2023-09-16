import { Link } from "react-router-dom";
import { Product } from "../../graphqlType";
import { useMutation } from "@tanstack/react-query";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART } from "../../graphql/cart";
// import { useRecoilState } from "recoil";
// import { cartItemSelector } from "../../recoils/cart";

export const ProductItem = ({ id, imageUrl, price, title }: Product) => {
	// const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));
	// const addToCart = () => setCartAmount((prev) => (prev || 0) + 1);
	const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }));
	return (
		<li className='product-item'>
			<Link to={`/products/${id}`}>
				<p className='product-item__title'>{title}</p>
				<img className='product-item__image' src={imageUrl} alt='product' />
				<span className='product-item__price'>${price}</span>
			</Link>
			<button className='product-item__add-cart' onClick={() => addCart(id)}>
				{/*onClick={addToCart}*/}
				담기
			</button>
		</li>
	);
};
