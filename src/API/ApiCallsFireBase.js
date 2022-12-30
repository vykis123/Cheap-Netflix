import {
  FIREBASE_USERS_URL,
  API_KEY,
  FIRBASE_LOGIN_SINGUP_URL,
} from "./fireBaseApiUtils";

// Function to log in into page
export const LogInApi = async (
  email,
  password,
  setInfoMsg,
  setLoggedIn,
  history,
  setUserName,
  setLogin,
  setLoading
) => {
  let loginInfo = {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
    header: {
      "Content-Type": "aplication/json",
    },
  };

  const logIn = await fetch(
    `${FIRBASE_LOGIN_SINGUP_URL}:signInWithPassword?key=${API_KEY}`,
    loginInfo
  );
  setLoading(true);

  const resposne = await logIn.json();
  if (!logIn.ok) {
    setLoading(false);
    if (resposne.error.message === "EMAIL_NOT_FOUND")
      return setInfoMsg("Email not found!");

    if (resposne.error.message === "INVALID_PASSWORD")
      return setInfoMsg("Password is inccorect!");
  }

  const name = await fetch(`${FIREBASE_USERS_URL}/.json`);

  const users = [];
  const nameRes = await name.json();
  for (const key in nameRes) {
    const itemObj = { id: key, ...nameRes[key] };

    users.push(itemObj);
  }

  const user = users.filter((user) => user.email === email);
  setLogin(
    email,
    new Date(new Date().getTime() + +resposne.expiresIn * 1000),
    user[0].name
  );
  setUserName(user[0].name);

  setLoading(false);
  setLoggedIn(true);
  history("/movies");
};

//Function to sing up for the page
export const SingUpApi = async (singUp, setUp, statusMessage, history) => {
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
      "Sign Up sucessful. You Will be Redirected to Login Page in couple seconds."
    );
    setTimeout(() => {
      history("/login");
    }, 2000);
  } catch (err) {
    alert(err.message);
  }
};
