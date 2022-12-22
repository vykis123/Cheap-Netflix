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
  movieDetails,
  trailerUrl,
  similarMovieUrl
) => {
  const movieDetails2 = [movieDetails, trailerUrl, similarMovieUrl];

  try {
    setLoading(true);

    const [movieDetailResponse, trailersResponse, similarMoviesResponse] =
      await Promise.all(
        movieDetails2.map((url) => fetch(url).then((res) => res.json()))
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
