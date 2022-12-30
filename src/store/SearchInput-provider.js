import { createContext } from "react";

import { useState } from "react";

const StoreSearchContext = createContext();

export const SearchInputValue = (props) => {
  const [searchResult, setSearchResult] = useState([]);

  let location = window.location.href;

  const typeOfVideo = location.includes("movies") ? "movies" : "tvseries";

  const search = {
    setSearchValue: setSearchResult,
    searchValue: searchResult,
    typeOfVideo: typeOfVideo,
  };

  return (
    <StoreSearchContext.Provider value={search}>
      {props.children}
    </StoreSearchContext.Provider>
  );
};

export default StoreSearchContext;
