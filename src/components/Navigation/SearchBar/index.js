import "./index.scss";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDebounceValue } from "../../../Hooks/Hooks";

const SearchBar = (props) => {
  const [enteredSearch, setEnteredSearch] = useState("");

  const debouncedSearchValue = useDebounceValue(enteredSearch, 500);

  useEffect(() => {
    if (debouncedSearchValue) {
      console.log("there is search result ===>", debouncedSearchValue);
    } else {
      console.log("there is no results ====>", debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

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
      />
    </div>
  );
};

export default SearchBar;
