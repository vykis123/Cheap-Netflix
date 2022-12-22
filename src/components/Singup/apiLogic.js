import {
  FIREBASE_USERS_URL,
  API_KEY,
  FIRBASE_LOGIN_SINGUP_URL,
} from "../../API/fireBaseApiUtils";

const apiLogic = async (singUp, setUp, statusMessage, history) => {
  try {
    const singUpRequest = await fetch(
      `${FIRBASE_LOGIN_SINGUP_URL}:signUp?key=${API_KEY}`,
      singUp
    );

    const data = await singUpRequest.json();

    if (!singUpRequest.ok) {
      data.error.message === "EMAIL_EXISTS"
        ? statusMessage("This email already exists!")
        : statusMessage("Sing Up failed");
      return;
    }

    const settingSingUpInfo = await fetch(`${FIREBASE_USERS_URL}.json`, setUp);

    statusMessage(
      "Sign Up sucessful. You Will be Redirected to Login Page in 2s."
    );
    setTimeout(() => {
      history("/login");
    }, 2000);
  } catch (err) {
    alert(err.message);
  }
};

export default apiLogic;
