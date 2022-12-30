import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import Sing from "./pages/Sing";
import TvSeries from "./pages/TvSeries";
import Wrong from "./pages/Wrong";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Homepage />} exact></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/sing" element={<Sing />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/tvseries" element={<TvSeries />} />
          <Route path="/tvseries/:movieId" element={<MovieDetails />} />
        </Route>

        <Route path="*" element={<Wrong />} />
      </Routes>
    </>
  );
}

export default App;
