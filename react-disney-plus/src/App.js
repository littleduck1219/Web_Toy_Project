import { styled } from "styled-components";
import "./App.css";
import * as CP from "./components";
import { requests } from "./api/requests";

function App() {
	return (
		<Container>
			<CP.Nav />
			<CP.Banner />
			<CP.Category />
			<CP.Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
			<CP.Row title='Trending Now' id='TR' fetchUrl={requests.fetchTopRated} />
			<CP.Row title='Trending Now' id='AM' fetchUrl={requests.fetchActionMovies} />
			<CP.Row title='Trending Now' id='CM' fetchUrl={requests.fetchComedyMovies} />
		</Container>
	);
}

export default App;

const Container = styled.main`
	position: relative;
	min-height: calc(100vh - 250px);
	overflow-x: hidden;
	display: block;
	top: 72px;
	padding: 0 calc(3.5vw + 5px);

	&:after {
		/* background: url("/images/스크린샷 2023-07-08 오후 9.52.57.png") center center / cover no-repeat fixed;
		background-size: contain; */
		background: url("/images/home-background.png") center center / cover no-repeat fixed;
		content: "";
		position: absolute;
		inset: 0px;
		opacity: 1;
		z-index: -1;
	}
	@media (max-width: 1280px) {
		&:after {
			background-size: 1280px 800px;
			background-position: center top;
		}
	}
`;
