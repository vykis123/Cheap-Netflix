import "./index.scss";
import { useContext } from "react";
import StoreContext from "../../store/Context-provider";

import { Link } from "react-router-dom";

const Wrong = () => {
  const loggedIn = useContext(StoreContext).loggIn[0];

  return (
    <div className="wrong">
      {!loggedIn && (
        <h2 className="wrong__heading">
          The URL which you tryng to access does not exists or you are not
          authorised to reach that content. Please{" "}
          <Link to="login">Sing In</Link>
        </h2>
      )}

      {loggedIn && (
        <h2 className="wrong__heading">
          The URL which you tryng to access does not exists or you are not
          authorised to reach that content. Please go back to
          <Link to="movies">Home Page</Link>
        </h2>
      )}
    </div>
  );
};

export default Wrong;
