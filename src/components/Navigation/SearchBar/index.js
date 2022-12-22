import "./index.scss";
import { BsSearch } from "react-icons/bs";

const SearchBar = (props) => {
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
      />
    </div>
  );
};

export default SearchBar;
