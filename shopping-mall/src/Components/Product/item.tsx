import { Product } from "../../types";

export const ProductItem = ({ category, description, image, price, rating, title }: Product) => (
	<li className='product-item'>
		<p className='product-item__category'>{category}</p>
		<p className='product-item__title'>{title}</p>
		<p className='product-item__description'>{description}</p>
		<img className='product-item__image' src={image} alt='product' />
		<span className='product-item__price'>${price}</span>
		<span className='product-item__rating'>{rating.rate}</span>
	</li>
);
