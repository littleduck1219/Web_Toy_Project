import Product from "../../graphqlType";

const ProductDetail = ({ item: { title, description, imageUrl, price } }: { item: Product }) => {
	return (
		<div className='product-detail'>
			<p className='product-detail__title'>{title}</p>
			<p className='product-detail__description'>{description}</p>
			<img className='product-detail__image' src={imageUrl} alt='product' />
			<span className='product-detail__price'>${price}</span>
		</div>
	);
};

export default ProductDetail;
