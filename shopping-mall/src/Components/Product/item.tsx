import { Product } from "../../types";

export const ProductItem = ({ category, description, id, image, price, rating, title }: Product) => (
	<li>
		<p>{category}</p>
		<p>{description}</p>
		<p>{id}</p>
		<img src={image} alt='' />
		<p>${price}</p>
		<p>{rating.rate}</p>
		<p>{title}</p>
		<p>{}</p>
	</li>
);
