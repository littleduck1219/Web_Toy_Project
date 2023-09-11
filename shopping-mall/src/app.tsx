import { Suspense, useEffect } from "react";
import { getClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routes } from "./routes";
import { useRoutes } from "react-router-dom";

const App = () => {
	const elem = useRoutes(routes);
	const queryClient = getClient();
	console.log("QueryClient:", queryClient);

	useEffect(() => {
		console.log("QueryClientProvider is mounted.");
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<div>Loading...</div>}>{elem}</Suspense>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
export default App;
