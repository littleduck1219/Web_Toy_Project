import React, { useCallback, useEffect, useState } from "react";
import { instance } from "../api";
import * as CP from "./MovieModal/";

export const Row = ({ title, id, fetchUrl }) => {
	const [movies, setMovies] = useState([]);
	const fetchMovieData = useCallback(async () => {
		const response = await instance.get(fetchUrl);
		setMovies(response.data.results);
	}, [fetchUrl]);

	const [modalOpen, setModalOpen] = useState(false);
	const [movieSelected, setMovieSelected] = useState({});
	const handClick = (movie) => {
		setModalOpen(true);
		setMovieSelected(movie);
	};

	useEffect(() => {
		fetchMovieData();
	}, [fetchMovieData]);

	return (
		<div>
			<h2>{title}</h2>
			<div className='slider'>
				<div className='slider__arrow-left'>
					<span
						className='arrow'
						onClick={() => {
							document.getElementById(id).scrollLeft -= window.innerWidth - 80;
						}}>
						{"<"}
					</span>
				</div>
				<div id={id} className='row__posters'>
					{movies &&
						movies.map((movie) => (
							<img
								key={movie.id}
								className='row__poster'
								src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
								alt={movie.name}
								onClick={() => handClick(movie)}
							/>
						))}
				</div>
				<div className='slider__arrow-right'>
					<span
						className='arrow'
						onClick={() => {
							document.getElementById(id).scrollLeft += window.innerWidth - 80;
						}}>
						{">"}
					</span>
				</div>
			</div>
			{modalOpen && <CP.MovieModal {...movieSelected} setModalOpen={setModalOpen}></CP.MovieModal>}
		</div>
	);
};
