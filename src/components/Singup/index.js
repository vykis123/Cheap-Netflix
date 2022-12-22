import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiLogic from "./apiLogic";
import "./index.scss";

const SingUp = () => {
  const history = useNavigate();
  const emailValidation =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [name, setName] = useState(null);
  const [emptyName, setEmptyName] = useState(false);
  const checkNameInput = (value) => {
    value.trim() === "" ? setEmptyName(false) : setEmptyName(true);
  };

  const [email, setEmail] = useState(null);
  const [wrongEmail, setWrongEmail] = useState(false);
  const checkEmailInput = (value) => {
    value.trim() === "" || !value.trim().toLowerCase().match(emailValidation)
      ? setWrongEmail(false)
      : setWrongEmail(true);
  };

  const [pass, setPass] = useState("");
  const [emptyPass, setEpmtyPass] = useState(false);
  const [toShort, setToShort] = useState(false);
  const checkPassInput = (value) => {
    value.trim() === "" ? setEpmtyPass(false) : setEpmtyPass(true);
  };

  const checkPassLenght = (value) => {
    value.trim().length < 6 ? setToShort(false) : setToShort(true);
  };

  const [pass2, setPass2] = useState(null);
  const [wrongPass2, setWrongPass2] = useState(false);
  const checkPassWithPass2 = (value) => {
    value.trim() === pass ? setWrongPass2(false) : setWrongPass2(true);
  };

  const [statusMessage, setStatusMessage] = useState("");

  const submitSingUp = (e) => {
    e.preventDefault();

    if (
      wrongPass2 === true ||
      emptyPass === false ||
      emptyName === false ||
      toShort === false
    ) {
      return;
    }

    let settings = {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass,
        returnSecureToken: true,
      }),
      header: {
        "Content-Type": "aplication/json",
      },
    };

    let allFieldsInfo = {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass,
        name: name,
      }),
      header: {
        "Content-Type": "application/json",
      },
    };

    apiLogic(settings, allFieldsInfo, setStatusMessage, history);

    e.target.reset();
  };
  return (
    <form className="singup" onSubmit={submitSingUp}>
      <h2 className="form__heading">Sing Up</h2>
      <span className="info-message">{statusMessage}</span>

      <div className="singup__group">
        <div className="wrapper">
          <input
            type="text"
            required
            id="name"
            placeholder=" "
            className={!emptyName ? "wrong-name" : ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onBlur={(e) => checkNameInput(e.target.value)}
          />
          <span>Enter Your Name</span>
        </div>
        {!emptyName && <p>Please enter valid info</p>}
      </div>

      <div className="singup__group">
        <div className="wrapper">
          <input
            type="email"
            required
            id="email"
            placeholder=" "
            className={!wrongEmail ? "wrong-email" : ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={(e) => checkEmailInput(e.target.value)}
          />
          <span>Email or phone number</span>
        </div>
        {!wrongEmail && <p>Please enter valid Email</p>}
      </div>

      <div className="singup__group">
        <div className="wrapper">
          <input
            type="password"
            required
            id="password"
            placeholder=" "
            className={!emptyPass ? "empty-email" : ""}
            onChange={(e) => {
              setPass(e.target.value);
              checkPassLenght(e.target.value);
            }}
            onBlur={(e) => checkPassInput(e.target.value)}
          />
          <span>Password</span>
        </div>
        {!emptyPass && <p>Please enter valid info</p>}
        <p className={!toShort ? "password" : "correct"}>
          Password should contain atleast 6 letters
        </p>
      </div>

      <div className="singup__group">
        <div className="wrapper">
          <input
            type="password"
            required
            id="password"
            placeholder=" "
            className={wrongPass2 ? "wrong-pass2" : ""}
            onChange={(e) => {
              setPass2(e.target.value);
              checkPassWithPass2(e.target.value);
            }}
          />
          <span>Repeat Pssword</span>
        </div>
        {wrongPass2 && <p>Password does not match!</p>}
      </div>

      <button className="singup__btn" type="submit">
        Sing In
      </button>

      <p className="singup__text">Already Have a Account?</p>
      <Link className="singup__link" to="/login">
        Sing In
      </Link>
    </form>
  );
};

export default SingUp;
