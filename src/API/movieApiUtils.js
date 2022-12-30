import { useParams } from "react-router-dom";
import { movieApiKey } from "./ConfigApi";

export const API_KEY = movieApiKey;
export const MAIN_URL = "https://api.themoviedb.org/3/";
export const tvGanreUrl = `${MAIN_URL}genre/tv/list?api_key=${API_KEY}&language=en-US`;
export const discoverTvUrl = `${MAIN_URL}discover/tv?api_key=${API_KEY}&with_genres=`;
export const movieGanreUrl = `${MAIN_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
export const discoverMovieUrl = `${MAIN_URL}discover/movie?api_key=${API_KEY}&with_genres=`;
export const searchMovieUrl = `${MAIN_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&query=`;
export const searchTvUrl = `${MAIN_URL}search/tv?api_key=${API_KEY}&language=en-US&page=1&query=`;

export const movieImgBaseUrlObj = {
  300: "http://image.tmdb.org/t/p/w300/",
  400: "http://image.tmdb.org/t/p/w400/",
  500: "http://image.tmdb.org/t/p/w500/",
  600: "http://image.tmdb.org/t/p/w600/",
  original: "http://image.tmdb.org/t/p/original/",
};

export const MovieDetailUrlBuilder = () => {
  const params = useParams();

  const { movieId } = params;

  const typeOfVideo = window.location.href.includes("movies") ? "movie" : "tv";

  const movieDetails = `${MAIN_URL}${typeOfVideo}/${movieId}?api_key=${API_KEY}&language=en-US`;
  const trailerUrl = `${MAIN_URL}${typeOfVideo}/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  const similarMovieUrl = `${MAIN_URL}${typeOfVideo}/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  const movieArr = [movieDetails, trailerUrl, similarMovieUrl];
  return movieArr;
};
