import "./index.scss";
import { NavLink } from "react-router-dom";
import StoreContext from "../../../store/Context-provider";
import { useContext, useState } from "react";
import Logo from "../../Logo";
import { MdArrowDropUp } from "react-icons/md";
import SearchBar from "../SearchBar";
import StoreSearchContext from "../../../store/SearchInput-provider";

const LogedNav = () => {
  const [search, setSearch] = useState(false);

  const userName = useContext(StoreContext).userName[0];

  const { setSearchValue } = useContext(StoreSearchContext);

  const clearSearchResultAfterClick = () => setSearchValue([]);

  const logOut = useContext(StoreContext).logout;
  const logoInfo = { min: 1, mid: 2, max: 2 };

  const openSearch = (event) => {
    event.target.parentNode.className === "navloged__search"
      ? setSearch(true)
      : setSearch(false);

    clearSearchResultAfterClick();
  };

  return (
    <>
      <nav className="navloged" onClick={openSearch}>
        <Logo info={logoInfo} />

        <ul className="navloged__links">
          <NavLink
            className="navloged__btn"
            to="/movies"
            onClick={clearSearchResultAfterClick}
          >
            Movies
          </NavLink>

          <NavLink
            className="navloged__btn"
            to="/tvseries"
            onClick={clearSearchResultAfterClick}
          >
            Tv Series
          </NavLink>
        </ul>

        <div className="search-wrapper">
          <SearchBar search={search} />
        </div>

        <div className="wrapper">
          <span className="navloged__name">{userName}</span>

          <button className="navloged__icon">
            <img
              src={require("../../../assets/green-avatar.png")}
              alt="user avatar"
            />

            <MdArrowDropUp className="arrow" />
          </button>
          <ul className="navloged__icon-menu">
            <span className="user-small">{userName}</span>

            <div className="search-wrapper-small">
              <SearchBar search={search} />
            </div>

            <NavLink
              className=""
              to="/"
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default LogedNav;
