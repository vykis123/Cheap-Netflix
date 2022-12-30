import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import StoreContext from "../../store/Context-provider";
import { LogInApi } from "../../API/ApiCallsFireBase";
import MiniLoader from "../MiniLoader";
import "./index.scss";

const Singin = () => {
  const setLoggedIn = useContext(StoreContext).loggIn[1];
  const setUserName = useContext(StoreContext).userName[1];
  const setLogIn = useContext(StoreContext).login;
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const [infoMsg, setInfoMsg] = useState("");

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [wrongEmail, setWrongEmail] = useState(true);
  const [wrongPass, setWrongPass] = useState(true);
  const emailValidation =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const chekingEmailValidation = (value) => {
    value.trim() === "" || !value.trim().toLowerCase().match(emailValidation)
      ? setWrongEmail(false)
      : setWrongEmail(true);
  };
  const chekingPassValidation = (value) => {
    value.trim() === "" ? setWrongPass(false) : setWrongPass(true);
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    LogInApi(
      email,
      password,
      setInfoMsg,
      setLoggedIn,
      history,
      setUserName,
      setLogIn,
      setLoading
    );

    setInfoMsg("");
    e.target.reset();
  };

  return (
    <form className="form" onSubmit={submitLogin}>
      <h2 className="form__heading">Sing In</h2>
      <div className="form__group">
        <div className="wrapper">
          <input
            type="email"
            required
            id="email"
            placeholder=" "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={(e) => chekingEmailValidation(e.target.value)}
            className={!wrongEmail ? "wrong-email" : ""}
          />
          <span>Email </span>
        </div>
        {!wrongEmail && <p>Please add valid information for this field!</p>}
      </div>
      <div className="form__group">
        <div className="wrapper">
          <input
            type="password"
            required
            id="password"
            placeholder=" "
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={(e) => chekingPassValidation(e.target.value)}
            className={!wrongPass ? "wrong-pass" : ""}
          />
          <span>Password</span>
        </div>
        {!wrongPass && <p>Please enter valid info</p>}
      </div>

      <button className="form__btn" type="submit">
        Sing In
      </button>

      <p className="form__text">New to Netflix?</p>
      <Link className="form__link" to="/sing">
        Sing up now
      </Link>

      <span className="form__info">{infoMsg}</span>
      {loading && <MiniLoader />}
    </form>
  );
};

export default Singin;
