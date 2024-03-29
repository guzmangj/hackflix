import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import SearchBar from "./SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

function MovieList({ rating, setMovies, movies }) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setPage(1);
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?vote_average.gte=${
            (rating - 1) * 2
          }&page=1&api_key=f1d02f62d0d4bc3ef480b7cf5aabfe87`
        );
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [rating]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?vote_average.gte=${
            (rating - 1) * 2
          }&page=${page}&api_key=f1d02f62d0d4bc3ef480b7cf5aabfe87`
        );
        setMovies([...movies, ...response.data.results]);
      } catch (error) {
        console.log(error);
      }
    };
    page > 1 && getMovies();
  }, [page]);

  const updateKeyword = (keyword) => {
    const filtered = movies.filter((movie) => {
      return `${movie.original_title.toLowerCase()}`.includes(
        keyword.toLowerCase()
      );
    });
    setKeyword(keyword);
    setMovies(filtered);
  };

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    movies && (
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={true}
      >
        <div>
          <SearchBar keyword={keyword} onChange={updateKeyword} />
        </div>
        <div className="text-center">
          {movies.map((movie, index) => {
            return (
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="moviePoster m-2"
                  key={`${movie.id}-${index} `}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={`${movie.original_title} poster`}
                  variant="primary"
                />
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    )
  );
}

export default MovieList;
