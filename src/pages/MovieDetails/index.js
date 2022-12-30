import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  movieImgBaseUrlObj,
  MovieDetailUrlBuilder,
} from "../../API/movieApiUtils";

import "./index.scss";
import MovieDetail from "../../components/MovieDetail";
import Loader from "../../components/Loader";
import MiniLoader from "../../components/MiniLoader";
import Slider from "../../components/MovieList";
import { gettingItemDetailsApiCall } from "../../API/ApiCallsMovieDB";

const MovieDetails = () => {
  const params = useParams();
  const { movieId } = params;

  const [data, setData] = useState("");
  const [trailers, setTrailers] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);

  const movieArr = MovieDetailUrlBuilder();

  useEffect(() => {
    gettingItemDetailsApiCall(
      setLoading,
      setData,
      setSimilar,
      setTrailers,
      movieArr
    );
  }, [movieId]);

  return (
    <>
      {!loading && (
        <div
          className="detail"
          style={{
            backgroundImage: `linear-gradient(108deg,rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.36)), url(${
              movieImgBaseUrlObj.original + data.backdrop_path
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
