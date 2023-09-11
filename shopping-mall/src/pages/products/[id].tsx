import { useQuery } from "@tanstack/react-query";
import { QueryKeys, graphqlFetcher } from "../../queryClient";
import { useParams } from "react-router-dom";
import ProductDetail from "../../Components/Product/detail";
import { Product } from "../../graphqlType";
import { GET_PRODUCT } from "../../graphql/products";

const ProductDetailPage = () => {
	const { id } = useParams();
	const { data } = useQuery<Product>(
		[QueryKeys.PRODUCT, id],
		() => graphqlFetcher(GET_PRODUCT, { id }) as Promise<Product>
	);

	if (!data) return null;
	return <ProductDetail item={data} />;
};

export default ProductDetailPage;
