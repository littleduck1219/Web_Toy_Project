import { Router } from "./Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const auth = getAuth(app);
	console.log(auth);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		});
	}, [auth]);

	return (
		<>
			<ToastContainer />
			<Router isAuthenticated={isAuthenticated} />
		</>
	);
};

export default App;
