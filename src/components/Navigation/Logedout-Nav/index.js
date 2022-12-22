import { Link } from "react-router-dom";
import Logo from "../../Logo";
import "./index.scss";

const LogedoutNav = () => {
  const logoInfo = { min: 1.35, mid: 2, max: 2.6 };
  return (
    <nav className="nav">
      <Logo info={logoInfo} />

      <div className="nav_btns">
        <Link className="nav__login btn" to="/login">
          Log In
        </Link>

        <Link className="nav__singup btn" to="/sing">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default LogedoutNav;
