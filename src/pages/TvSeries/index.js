import { useEffect, useState } from "react";
import Loader from "../../components/Loader/index";
import Slider from "../../components/MovieList";
import { movieApiCall } from "../../API/ApiCallsMovieDB";
import { discoverTvUrl, tvGanreUrl } from "../../API/movieApiUtils";
import "./index.scss";

const TvSeries = () => {
  const [ganres, setGanres] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    movieApiCall(
      discoverTvUrl,
      tvGanreUrl,
      setMovieList,
      setGanres,
      setLoading
    );
  }, []);

  return (
    <div className="tvseries">
      {!loading &&
        movieList.map((movieList, i) => {
          return <Slider movie={movieList.results} name={ganres[i]} key={i} />;
        })}

      {loading && <Loader />}
    </div>
  );
};

export default TvSeries;
