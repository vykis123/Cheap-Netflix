import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, MAIN_URL } from "../../API/movieApiUtils";

import "./index.scss";
import MovieDetail from "../../components/MovieDetail";
import Loader from "../../components/Loader";
import MiniLoader from "../../components/MiniLoader";
import Slider from "../../components/MovieList";
import { gettingItemDetailsApiCall } from "../../API/ApiCallsMovieDB";

const MovieDetails = () => {
  const params = useParams();

  const imgSrc = "http://image.tmdb.org/t/p/original/";

  const [data, setData] = useState("");
  const [trailers, setTrailers] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);

  const { movieId } = params;

  let location = window.location.href;

  const typeOfVideo = location.includes("movies") ? "movie" : "tv";

  const movieDetails = `${MAIN_URL}${typeOfVideo}/${movieId}?api_key=${API_KEY}&language=en-US`;
  const trailerUrl = `${MAIN_URL}${typeOfVideo}/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  const similarMovieUrl = `${MAIN_URL}${typeOfVideo}/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    gettingItemDetailsApiCall(
      setLoading,
      setData,
      setSimilar,
      setTrailers,
      movieDetails,
      trailerUrl,
      similarMovieUrl
    );
  }, [movieDetails, trailerUrl, similarMovieUrl]);

  return (
    <>
      {!loading && (
        <div
          className="detail"
          style={{
            backgroundImage: `linear-gradient(108deg,rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.36)), url(${
              imgSrc + data.backdrop_path
            })`,
          }}
        >
          {!loading && <MovieDetail data={data} trailers={trailers} />}
          {loading && <MiniLoader />}

          <Slider movie={similar} name={"Similar"} />
        </div>
      )}
      {loading && <Loader />}
    </>
  );
};

export default MovieDetails;
