import React, { useCallback, useEffect, useState } from "react";
import { instance } from "../../api/axios";

export const Row = ({ title, id, fetchUrl }) => {
	const [movies, setMovies] = useState([]);

	const fetchMovieData = useCallback(async () => {
		const response = await instance.get(fetchUrl);
		setMovies(response.data.results);
	}, [fetchUrl]);

	useEffect(() => {
		fetchMovieData();
	}, [fetchMovieData]);

	return (
		<div>
			<h2>{title}</h2>
			<div className='slider'>
				<div className='slider__arrow-left'>
					<span className='arrow'>{"<"}</span>
				</div>
				<div id={id} className='row__posters'>
					{movies &&
						movies.map((movie) => (
							<img
								key={movie.id}
								className='row__posters'
								src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
								alt={movie.name}
							/>
						))}
				</div>
				<div className='slider__arrow-right'>
					<span className='arrow'>{">"}</span>
				</div>
			</div>
		</div>
	);
};
