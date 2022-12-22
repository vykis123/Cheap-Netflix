import "./index.scss";

const MovieTrailer = ({ trailerkey }) => {
  const trailerUrl = "https://www.youtube.com/embed/";
  return (
    <div className="movie__trailer">
      <iframe
        src={`${trailerUrl + trailerkey}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="movie__trailer-video"
      ></iframe>
    </div>
  );
};

export default MovieTrailer;
