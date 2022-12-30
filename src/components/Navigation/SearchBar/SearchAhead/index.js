import "./index.scss";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import StoreSearchContext from "../../../../store/SearchInput-provider";
import { movieImgBaseUrlObj } from "../../../../API/movieApiUtils";

const TypeAhead = ({ searchRes, clearSearch }) => {
  const { typeOfVideo } = useContext(StoreSearchContext);

  return (
    <ul
      className={
        searchRes.length > 0
          ? `navloged__typeahead notempty`
          : `navloged__typeahead`
      }
    >
      {searchRes.map((searchReso) => {
        return (
          <NavLink
            className="searchdata"
            key={searchReso.id}
            to={`/${typeOfVideo}/${searchReso.id}`}
            onClick={clearSearch}
          >
            <div className="searchdata__img">
              <img
                src={movieImgBaseUrlObj[300] + searchReso.poster_path}
                alt="search icon"
              />
            </div>
            <h4 className="searchdata__name">
              {typeOfVideo === "tvseries"
                ? searchReso.original_name
                : searchReso.title}
            </h4>
          </NavLink>
        );
      })}
    </ul>
  );
};

export default TypeAhead;
