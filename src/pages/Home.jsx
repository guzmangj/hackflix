import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import "./Home.css";

function Home() {
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState(movies);

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Filter setRating={setRating} />
        </div>
        <div>
          <SearchBar />
        </div>
        <div className="fade-in">
          <MovieList rating={rating} movies={movies} setMovies={setMovies} />
        </div>
      </div>
    </>
  );
}

export default Home;
