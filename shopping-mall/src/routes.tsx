import GlobalLayout from "./pages/_layout";
import MainPage from "./pages";
import ProductList from "./pages/products";
import ProductDetailPage from "./pages/products/[id]";
import Cart from "./pages/cart";

export const routes = [
	{
		path: "/",
		element: <GlobalLayout />,
		children: [
			{ path: "/", element: <MainPage />, index: true },
			{ path: "/products", element: <ProductList />, index: true },
			{ path: "/products/:id", element: <ProductDetailPage /> },
			{ path: "/products/cart", element: <Cart />, index: true },
		],
	},
];
