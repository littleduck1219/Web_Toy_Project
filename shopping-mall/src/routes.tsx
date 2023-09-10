import GlobalLayout from "./pages/_layout";
import * as Lazy from "./Lazy";

export const routes = [
	{
		path: "/",
		element: <GlobalLayout />,
		children: [
			{ path: "/", element: <Lazy.DynamicIndex />, index: true },
			{ path: "/products", element: <Lazy.DynamicProductsIndex />, index: true },
			{ path: "/products/:id", element: <Lazy.DynamicProductsId /> },
		],
	},
];

export const pages = [{ route: "/" }, { route: "/products" }, { route: "/products/:id" }];
