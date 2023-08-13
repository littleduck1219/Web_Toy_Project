import axios from "axios";

export const instance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: "66928bade008d909c776b2a3b9e163e1",
		language: "ko-KR",
	},
});
