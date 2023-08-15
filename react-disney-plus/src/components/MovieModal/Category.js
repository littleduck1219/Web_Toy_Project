import React from "react";
import styled from "styled-components";

export const Category = () => {
	const categories = [
		{ image: "/images/viewers-disney.png", video: "/videos/disney.mp4", alt: "disney" },
		{ image: "/images/viewers-Pixar.png", video: "/videos/Pixar.mp4", alt: "Pixar" },
		{ image: "/images/viewers-Marvel.png", video: "/videos/Marvel.mp4", alt: "Marvel" },
		{ image: "/images/viewers-starwars.png", video: "/videos/star-wars.mp4", alt: "star-wars" },
		{ image: "/images/viewers-national.png", video: "/videos/national-geographic.mp4", alt: "national-geographic" },
	];

	return (
		<Container>
			{categories.map((category, index) => (
				<Wrap key={index}>
					<img src={category.image} alt={category.alt} />
					<video autoPlay loop muted>
						<source src={category.video} type='video/mp4' />
					</video>
				</Wrap>
			))}
		</Container>
	);
};
const Container = styled.div`
	margin-top: 30px;
	padding: 30px 0px 26px;
	display: grid;
	gap: 25px;
	grid-template-columns: repeat(5, 1fr);

	@media (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

const Wrap = styled.div`
	padding-top: 56.25%;
	border-radius: 10px;
	box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
	cursor: pointer;
	overflow: hidden;
	position: relative;
	border: 3px solid rgba(249, 249, 249, 0.1);
	transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

	img {
		inset: 0px;
		display: block;
		height: 100%;
		object-fit: cover;
		opacity: 1;
		position: absolute;
		transition: opacity 500ms ease-in-out 0s;
		width: 100%;
		z-index: 1;
	}

	video {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		opacity: 0;
		z-index: 0;
	}

	&:hover {
		box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
		transform: scale(1.05);
		border-color: rgba(249, 249, 249, 0.8);

		video {
			opacity: 1;
		}
	}
`;
