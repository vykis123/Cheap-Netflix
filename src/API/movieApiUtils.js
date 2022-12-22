import { movieApiKey } from "./ConfigApi";

export const API_KEY = movieApiKey;
export const MAIN_URL = "https://api.themoviedb.org/3/";
export const tvGanreUrl = `${MAIN_URL}genre/tv/list?api_key=${API_KEY}&language=en-US`;
export const discoverTvUrl = `${MAIN_URL}discover/tv?api_key=${API_KEY}&with_genres=`;
export const movieGanreUrl = `${MAIN_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
export const discoverMovieUrl = `${MAIN_URL}discover/movie?api_key=${API_KEY}&with_genres=`;
