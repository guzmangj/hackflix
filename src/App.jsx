import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MovieNavbar from "./components/MovieNavbar";
import Pelicula from "./pages/Pelicula";
import Error404 from "./pages/Error404";

function App() {
  return (
    <>
      <MovieNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pelicula/:id" element={<Pelicula />} />
        <Route
          path="/movie/:id"
          element={<Navigate replace to="/pelicula/:id" />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
