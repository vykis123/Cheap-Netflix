import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import Sing from "./pages/Sing";
import TvSeries from "./pages/TvSeries";
import Wrong from "./pages/Wrong";
import StoreContext from "./store/Context-provider";

function App() {
  const loggedIn = useContext(StoreContext).loggIn[0];

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} exact></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sing" element={<Sing />} />
        {loggedIn && <Route path="/movies" element={<Movies />} />}
        {loggedIn && (
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        )}
        {loggedIn && <Route path="/tvseries" element={<TvSeries />}></Route>}
        {loggedIn && (
          <Route path="/tvseries/:movieId" element={<MovieDetails />} />
        )}
        <Route path="*" element={<Wrong />} />
      </Routes>
    </>
  );
}

export default App;
