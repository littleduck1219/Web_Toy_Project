import { Link } from "react-router-dom";
import { Product } from "../../graphqlType";
// import { useRecoilState } from "recoil";
// import { cartItemSelector } from "../../recoils/cart";

export const ProductItem = ({ id, imageUrl, price, title }: Product) => {
	// const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));
	// const addToCart = () => setCartAmount((prev) => (prev || 0) + 1);
	return (
		<li className='product-item'>
			<Link to={`/products/${id}`}>
				<p className='product-item__title'>{title}</p>
				<img className='product-item__image' src={imageUrl} alt='product' />
				<span className='product-item__price'>${price}</span>
			</Link>
			<button className='product-item__add-cart'>
				{/*onClick={addToCart}*/}
				담기
			</button>
		</li>
	);
};
