import { useEffect, useState } from "react";
import Loader from "../../components/Loader/index";
import Slider from "../../components/MovieList";
import { movieGanreUrl, discoverMovieUrl } from "../../API/movieApiUtils";
import { movieApiCall } from "../../API/ApiCallsMovieDB";
import "./index.scss";

const Movies = () => {
  const [ganres, setGanres] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    movieApiCall(
      discoverMovieUrl,
      movieGanreUrl,
      setMovieList,
      setGanres,
      setLoading
    );
  }, []);

  return (
    <div className="movies">
      {!loading &&
        movieList.map((movieList, i) => {
          return <Slider movie={movieList.results} name={ganres[i]} key={i} />;
        })}

      {loading && <Loader />}
    </div>
  );
};

export default Movies;
