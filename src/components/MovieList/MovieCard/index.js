import "./index.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import StoreSearchContext from "../../../store/SearchInput-provider";
import { movieImgBaseUrlObj } from "../../../API/movieApiUtils";

const MovieCard = ({ movie }) => {
  const { setSearchValue, typeOfVideo } = useContext(StoreSearchContext);

  const clearSearchResultAfterClick = () => setSearchValue([]);

  return (
    <div className="card-wrapper" key={movie.id}>
      <div className="card" tabIndex="0" key={movie.id}>
        <div className="card__img">
          <img
            src={movieImgBaseUrlObj[300] + movie.poster_path}
            alt="Specific movie poster"
            loading="lazy"
          ></img>
        </div>
        <div className="card__extra">
          <span className="card__extra-votes">Votes {movie.vote_average}</span>
          <Link
            className="card__extra-btn"
            to={`/${typeOfVideo}/${movie.id}`}
            onClick={clearSearchResultAfterClick}
          >
            Go to details
          </Link>
          <p className="card__extra-summary">
            {movie.overview !== ""
              ? movie.overview
              : "No plot for this item. Check in details for more info :)"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
