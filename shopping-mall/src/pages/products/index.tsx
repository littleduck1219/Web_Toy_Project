import { useQuery } from "@tanstack/react-query";
import { QueryKeys, graphqlFetcher } from "../../queryClient";
import { ProductItem } from "../../Components/Product/item";
import { Products } from "../../graphqlType";
import { GET_PRODUCTS } from "../../graphql/products";

const ProductList = () => {
	const { data, isLoading, error } = useQuery<Products>(
		[QueryKeys.PRODUCTS],
		() => graphqlFetcher(GET_PRODUCTS) as Promise<Products>
	);

	if (isLoading) {
		<div>Loading...</div>;
	} else if (error) {
		<div> error</div>;
	}
	return (
		<div>
			<ul className='products'>
				{data?.products?.map((product) => (
					<ProductItem {...product} key={product.id} />
				))}
			</ul>
		</div>
	);
};

export default ProductList;
