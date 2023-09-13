import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./scss/index.scss";
import App from "./app";
import { worker } from "./mocks/browser";
import { RecoilRoot } from "recoil";

// ReactDOM.render(
// 	<React.StrictMode>
// 		{/* <RecoilRoot> */}
// 		<BrowserRouter>
// 			<App />
// 		</BrowserRouter>
// 		{/* </RecoilRoot> */}
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

if (import.meta.env.DEV) {
	worker.start();
}

root.render(
	<BrowserRouter>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</BrowserRouter>
);
