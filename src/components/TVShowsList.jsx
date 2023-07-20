import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import SearchBar from "./SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

function TVShowsList({ rating, setTvshows, tvshows }) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setPage(1);
    const getTvshows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?vote_average.gte=${
            (rating - 1) * 2
          }&page=1&api_key=f1d02f62d0d4bc3ef480b7cf5aabfe87`
        );
        setTvshows(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTvshows();
  }, [rating]);

  useEffect(() => {
    const getTvshows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?vote_average.gte=${
            (rating - 1) * 2
          }&page=${page}&api_key=f1d02f62d0d4bc3ef480b7cf5aabfe87`
        );
        setTvshows([...tvshows, ...response.data.results]);
      } catch (error) {
        console.log(error);
      }
    };
    page > 1 && getTvshows();
  }, [page]);

  const updateKeyword = (keyword) => {
    const filtered = tvshows.filter((tv) => {
      return `${tv.original_name.toLowerCase()}`.includes(
        keyword.toLowerCase()
      );
    });
    setKeyword(keyword);
    setTvshows(filtered);
  };

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    tvshows && (
      <InfiniteScroll
        dataLength={tvshows.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={true}
      >
        <div>
          <SearchBar keyword={keyword} onChange={updateKeyword} />
        </div>
        <div className="text-center">
          {tvshows.map((tv, index) => {
            return (
              <Link to={`/tvshows/${tv.id}`}>
                {tv.poster_path === null ? (
                  <span
                    key={`${tv.id}-${index} `}
                    style={{
                      height: "450px",
                      width: "300px",
                      backgroundColor: "black",
                    }}
                  ></span>
                ) : (
                  <img
                    className="moviePoster m-2"
                    key={`${tv.id}-${index} `}
                    src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                    alt={`${tv.original_name} poster`}
                    variant="primary"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    )
  );
}

export default TVShowsList;
