import "./index.scss";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  let imgSrc = "http://image.tmdb.org/t/p/w300/";

  let location = window.location.href;

  const typeOfVideo = location.includes("movies") ? "movies" : "tvseries";

  return (
    <div className="card-wrapper" key={movie.id}>
      <div className="card" tabIndex="0" key={movie.id}>
        <div className="card__img">
          <img
            src={imgSrc + movie.poster_path}
            alt="Specific movie poster"
            loading="lazy"
          ></img>
        </div>
        <div className="card__extra">
          <span className="card__extra-votes">Votes {movie.vote_average}</span>
          <Link className="card__extra-btn" to={`/${typeOfVideo}/${movie.id}`}>
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
