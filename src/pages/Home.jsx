import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Movie from "../components/Movie";

function Home() {
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Filter setRating={setRating} />
        </div>
        <div className="fade-in">
          <Movie rating={rating} movies={movies} setMovies={setMovies} />
        </div>
      </div>
    </>
  );
}

export default Home;
