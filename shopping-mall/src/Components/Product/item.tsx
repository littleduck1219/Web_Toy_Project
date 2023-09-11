import { Link } from "react-router-dom";
import { Product } from "../../graphqlType";

export const ProductItem = ({ imageUrl, price, title, id }: Product) => (
	<li className='product-item'>
		<Link to={`/products/${id}`}>
			<p className='product-item__title'>{title}</p>
			<img className='product-item__image' src={imageUrl} alt='product' />
			<span className='product-item__price'>${price}</span>
		</Link>
	</li>
);
