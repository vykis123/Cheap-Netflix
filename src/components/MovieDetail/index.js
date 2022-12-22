import "./index.scss";

import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { TbMessageLanguage } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";
import { GiBoneGnawer } from "react-icons/gi";
import { ImFilePicture } from "react-icons/im";
import { IoIosEasel } from "react-icons/io";
import MovieTrailer from "./MovieTrailer";

const MovieDetail = ({ data, trailers }) => {
  let firstThreeTrailers = trailers.slice(0, 3);

  let location = window.location.href;

  const typeOfVideo = location.includes("movies") ? "movie" : "tv";

  return (
    <div className="movie">
      <h2 className="movie__title">
        {typeOfVideo === "movie" ? data.title : data.name}
      </h2>
      <div className="movie__summary">
        <div className="movie__summary-wrapper">
          <p className="movie__summary-text">{data.overview}</p>
          <div className="movie__info">
            <span className="movie__info-data">
              <i>Release date:</i>{" "}
              {typeOfVideo === "movie"
                ? data.release_date
                : data.first_air_date}
              <BsCalendarDate className="icon" />
            </span>
            <span className="movie__info-data">
              <i> Avr:</i> {data.vote_average?.toFixed(1)}
              <MdOutlineStarBorderPurple500 className="icon" />
            </span>
            <span className="movie__info-data">
              <i>Lang:</i>{" "}
              {data.original_language?.charAt(0).toUpperCase() +
                data.original_language?.slice(1)}
              <TbMessageLanguage className="icon" />
            </span>
            {typeOfVideo === "movie" && (
              <span className="movie__info-data">
                {data.runtime} <i>mins</i> <IoTimerOutline className="icon" />
              </span>
            )}
            {typeOfVideo === "tv" && (
              <span className="movie__info-data">
                {data.number_of_episodes} <i>Episodes</i>
                <ImFilePicture className="icon" />
              </span>
            )}
            {typeOfVideo === "tv" && (
              <span className="movie__info-data">
                {data.number_of_seasons > 1
                  ? `${data.number_of_seasons} Seasons`
                  : `${data.number_of_seasons} Season`}
                <IoIosEasel className="icon" />
              </span>
            )}
            <span className="movie__info-data">
              <i>Ganres:</i>
              {data.genres?.map((ganre) => {
                return ` ${ganre.name}  `;
              })}
              <GiBoneGnawer className="icon" />
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
        <span className="movie__trailer-notfound">
          There are No Trailers for this &#128549;
        </span>
      )}
    </div>
  );
};

export default MovieDetail;
