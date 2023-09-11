import { useQuery } from "@tanstack/react-query";
import { QueryKeys, fetcher } from "../../queryClient";
import { Product } from "../../types";
import { useParams } from "react-router-dom";
import ProductDetail from "../../Components/Product/detail";

const ProductDetailPage = () => {
	const { id } = useParams();
	const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
		fetcher({
			method: "GET",
			path: `/products/${id}`,
		})
	);

	if (!data) return null;
	return <ProductDetail item={data} />;
};

export default ProductDetailPage;
