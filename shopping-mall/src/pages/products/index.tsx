import { useQuery } from "@tanstack/react-query";
import { QueryKeys, fetcher } from "../../queryClient";
import { Product } from "../../types";
import { ProductItem } from "../../Components/Product/item";

const ProductList = () => {
	const { data } = useQuery<Product[]>([QueryKeys.PRODUCTS], () =>
		fetcher({
			method: "GET",
			path: "/products",
		})
	);
	return (
		<div>
			<ul className='products'>
				{data?.map((product) => (
					<ProductItem {...product} key={product.id} />
				))}
			</ul>
		</div>
	);
};

export default ProductList;
