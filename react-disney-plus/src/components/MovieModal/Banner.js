import React, { useEffect, useState } from "react";
import * as Api from "../../api";

export const Banner = () => {
	const [movie, setMovie] = useState([]);
	const [isClicked, setClicked] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		// 현재 상영중인 영화
		const response = await Api.instance.get(Api.requests.fetchNowPlaying);
		console.log(response);

		// 여러 영화 중 영화 하나의 ID 가져오기
		const movieId = response.data.results[Math.floor(Math.random() * response.data.results.length)].id;
		const { data: movieDetail } = await Api.instance.get(`movie/${movieId}`, {
			params: { append_to_response: "videos" },
		});
		setMovie(movieDetail);
	};

	const truncate = (str, n) => {
		return str?.length > n ? str.substring(0, n) + "..." : str;
	};

	return (
		<header
			className='banner'
			style={{
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
				backgroundPosition: "top center",
				backgroundSize: "cover",
				// height: 300,
			}}>
			<div className='banner__contents'>
				<h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
				<div className='banner__buttons'>
					{movie?.videos?.results[0]?.key && <button className='banner__button play'>Play</button>}
				</div>
				<p className='banner__description'>{truncate(movie.overview, 10)}</p>
			</div>
			<div className='banner--fadeBottom'></div>
		</header>
	);
};
