import {
  FIREBASE_USERS_URL,
  API_KEY,
  FIRBASE_LOGIN_SINGUP_URL,
} from "../../API/fireBaseApiUtils";

const FetchApi = async (
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

export default FetchApi;
