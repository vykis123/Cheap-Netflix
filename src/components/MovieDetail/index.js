import "./index.scss";

import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { TbMessageLanguage } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";
import MovieTrailer from "./MovieTrailer";

const MovieDetail = ({ data, trailers }) => {
  let firstThreeTrailers = trailers.slice(0, 3);

  return (
    <div className="movie">
      <h2 className="movie__title">{data.title}</h2>
      <div className="movie__summary">
        <div className="movie__summary-wrapper">
          <p className="movie__summary-text">{data.overview}</p>
          <div className="movie__info">
            <span className="movie__info-data">
              Release date: {data.release_date}
              <BsCalendarDate className="icon" />
            </span>
            <span className="movie__info-data">
              Avr: {data.vote_average}
              <MdOutlineStarBorderPurple500 className="icon" />
            </span>
            <span className="movie__info-data">
              Lang: {data.original_language}
              <TbMessageLanguage className="icon" />
            </span>
            <span className="movie__info-data">
              {data.runtime} mins <IoTimerOutline className="icon" />
            </span>
          </div>
        </div>

        <img
          src={`http://image.tmdb.org/t/p/w300/${data.poster_path}`}
          className="movie__summary-img"
          alt="movie poster"
        ></img>
      </div>
      <h2 className="movie__trailer-heading">Movie Trailers</h2>
      {firstThreeTrailers.length > 0 &&
        firstThreeTrailers.map((trailer) => {
          return <MovieTrailer trailerkey={trailer.key} />;
        })}

      {firstThreeTrailers.length <= 0 && (
        <span>This Movie Has No Trailers</span>
      )}
    </div>
  );
};

export default MovieDetail;
