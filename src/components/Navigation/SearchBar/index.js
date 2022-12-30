import "./index.scss";
import { BsSearch } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { useDebounceValue } from "../../../Hooks/Hooks";
import { fetchingDataByEnteredSearch } from "../../../API/ApiCallsMovieDB";
import TypeAhead from "./SearchAhead";
import StoreSearchContext from "../../../store/SearchInput-provider";

const SearchBar = (props) => {
  const [enteredSearch, setEnteredSearch] = useState("");

  const { setSearchValue, searchValue } = useContext(StoreSearchContext);

  const debouncedSearchValue = useDebounceValue(enteredSearch, 500);

  const inputResult = useRef();

  useEffect(() => {
    if (debouncedSearchValue) {
      fetchingDataByEnteredSearch(debouncedSearchValue, setSearchValue);
    } else {
      setSearchValue([]);
    }
  }, [debouncedSearchValue, setSearchValue]);

  const clearSearchResultAfterClick = () => {
    inputResult.current.value = "";
    setSearchValue([]);
  };

  return (
    <div className={"navloged__search"}>
      <BsSearch
        fill="#fff"
        style={{
          width: 1.6 + "rem",
          height: 1.6 + "rem",
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          left: "2%",
          transform: "translateY(-50%)",
        }}
      />
      <input
        type="text"
        placeholder="Enter the title"
        className={props.search ? "open" : ""}
        onChange={(e) => setEnteredSearch(e.target.value)}
        ref={inputResult}
      />

      <TypeAhead
        searchRes={searchValue}
        clearSearch={clearSearchResultAfterClick}
      />
    </div>
  );
};

export default SearchBar;
