import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import MovieCard from "./MovieCard";
import "./index.scss";

const Slider = ({ movie, name }) => {
  const slider = useRef();

  const onSelectRight = () => {
    if (!slider.current) return;

    const shouldScrollBack =
      slider.current.scrollLeft + slider.current.clientWidth >=
      slider.current.scrollWidth;

    slider.current.scroll({
      behavior: "smooth",
      left: shouldScrollBack
        ? 0
        : slider.current.scrollLeft + (slider.current.clientWidth + 50),
    });
  };

  const onSelectLeft = () => {
    if (!slider.current) {
      return;
    }

    const shouldScrollToEnd = slider.current.scrollLeft <= 0;

    slider.current.scroll({
      behavior: "smooth",
      left: shouldScrollToEnd
        ? slider.current.scrollWidth
        : slider.current.scrollLeft - (slider.current.clientWidth - 50),
    });
  };

  // const onTouchLeft = (diff) => {
  //   slider.current.scroll({
  //     behavior: "smooth",
  //     left: slider.current.scrollLeft + diff,
  //   });
  // };

  const [touchPosition, setTouchPosition] = useState(null);

  const onTouchLogic = (diff) => {
    slider.current.scroll({
      behavior: "smooth",
      left: slider.current.scrollLeft + diff,
    });
  };

  const handleTouchStart = (event) => {
    console.log(event);
    const touchDown = event.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const onTouchMove = (event) => {
    const touchDown = touchPosition;

    if (!touchDown) return;

    const currentTouch = event.touches[0].clientX;
    const diff = touchDown - currentTouch;

    onTouchLogic(diff);
  };

  const { ref: slide, inView: sliderIsVisibile } = useInView();

  return (
    <div className={`slider ${sliderIsVisibile ? "visible" : ""}`} ref={slide}>
      <h2 className="slider__name">{name}</h2>
      <div className="slider__collum">
        <button className="slider-arrow left" onClick={onSelectLeft}>
          <AiOutlineArrowLeft className="arrow" />
        </button>
        <div
          className="slider__wrapper"
          ref={slider}
          onTouchStart={handleTouchStart}
          onTouchMove={onTouchMove}
        >
          {movie.map((movie) => {
            return (
              <MovieCard
                movie={movie}
                onTouchStart={handleTouchStart}
                onTouchMove={onTouchMove}
              />
            );
          })}
        </div>
        <button className="slider-arrow right" onClick={onSelectRight}>
          <AiOutlineArrowRight className="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
