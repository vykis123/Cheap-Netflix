import "./index.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import StoreContext from "../../store/Context-provider";

const Logo = ({ info }) => {
  const loggedIn = useContext(StoreContext).loggIn[0];
  return (
    <span
      className="nav__logo"
      style={{
        fontSize: `clamp(${info.min}rem, ${info.mid}vw, ${info.max}rem)`,
      }}
    >
      {!loggedIn && <Link to="/">NETFLIX</Link>}
      {loggedIn && <Link to="/movies">NETFLIX</Link>}
    </span>
  );
};

export default Logo;
