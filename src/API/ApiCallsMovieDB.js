import { searchMovieUrl, searchTvUrl } from "./movieApiUtils";

//Fetching data for movie and tv series list
export const movieApiCall = async (
  apiCall,
  ganreCall,
  setMovieList,
  setGanres,
  setLoading
) => {
  try {
    setLoading(true);

    //Getting ganres and names from API call
    const ganreFirstCall = await fetch(ganreCall);

    const { genres } = await ganreFirstCall.json();

    //Getting movie list by ganres

    genres.forEach(async (movieList) => {
      const movieListFirstCall = await fetch(`${apiCall}${movieList.id}`);
      const movieListResponse = await movieListFirstCall.json();

      setMovieList((prevList) => [...prevList, movieListResponse]);
      setGanres((prevElement) => [...prevElement, movieList.name]);
    });

    setLoading(false);
  } catch (err) {
    new Error(err);
  }
};

//Fetching data for movie and tv series details and additional
export const gettingItemDetailsApiCall = async (
  setLoading,
  setData,
  setSimilar,
  setTrailers,
  movieArr
) => {
  try {
    setLoading(true);

    const [movieDetailResponse, trailersResponse, similarMoviesResponse] =
      await Promise.all(
        movieArr.map((url) => fetch(url).then((res) => res.json()))
      );

    trailersResponse.results.forEach((trailer) => {
      if (trailer.official === true) {
        setTrailers(trailersResponse.results);
      }
    });

    setLoading(false);
    setData(movieDetailResponse);
    setSimilar(similarMoviesResponse.results);
  } catch (error) {
    throw Error(error);
  }
};

//Function which is used when searching for movies or tv from search bar
export const fetchingDataByEnteredSearch = async (
  debouncedSearchValue,
  setSearchResult
) => {
  try {
    let location = window.location.href;

    const movieSearch = await fetch(
      location.includes("movies")
        ? `${searchMovieUrl + debouncedSearchValue}`
        : `${searchTvUrl + debouncedSearchValue}`
    );

    const movieSearchResponse = await movieSearch.json();

    setSearchResult(movieSearchResponse.results);
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};
