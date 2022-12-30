import "./index.scss";

import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { TbMessageLanguage } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";
import { GiBoneGnawer } from "react-icons/gi";
import { ImFilePicture } from "react-icons/im";
import { IoIosEasel } from "react-icons/io";
import MovieTrailer from "./MovieTrailer";
import { movieImgBaseUrlObj } from "../../API/movieApiUtils";
import { useContext } from "react";
import StoreSearchContext from "../../store/SearchInput-provider";

const MovieDetail = ({ data, trailers }) => {
  let firstThreeTrailers = trailers.slice(0, 3);

  const { typeOfVideo } = useContext(StoreSearchContext);

  return (
    <div className="movie">
      <h2 className="movie__title">
        {typeOfVideo === "movies" ? data.title : data.name}
      </h2>
      <div className="movie__summary">
        <div className="movie__summary-wrapper">
          <p className="movie__summary-text">{data.overview}</p>
          <div className="movie__info">
            <span className="movie__info-data">
              <i>Release date:</i>{" "}
              {typeOfVideo === "movies"
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
            {typeOfVideo === "movies" && (
              <span className="movie__info-data">
                <i>Length: </i> {`${data.runtime} mins`}{" "}
                <IoTimerOutline className="icon" />
              </span>
            )}
            {typeOfVideo === "tvseries" && (
              <span className="movie__info-data">
                <i>Episodes:</i> {data.number_of_episodes}
                <ImFilePicture className="icon" />
              </span>
            )}
            {typeOfVideo === "tvseries" && (
              <span className="movie__info-data">
                {data.number_of_seasons > 1 ? (
                  <i>Seasons: </i>
                ) : (
                  <i>Season: </i>
                )}
                {data.number_of_seasons}
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
          src={`${movieImgBaseUrlObj[300]}${data.poster_path}`}
          className="movie__summary-img"
          alt="movie poster"
        ></img>
      </div>
      <h2 className="movie__trailer-heading">Video Trailers</h2>
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
