import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Api from "../../api";

export const Banner = () => {
	const [movie, setMovie] = useState([]);

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
		console.log(movie);
	};

	return <div>Banner</div>;
};
