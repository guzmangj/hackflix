import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Header from "../components/Header";
import TVShowsList from "../components/TVShowsList";

function Series() {
  const [rating, setRating] = useState(0);
  const [tvshows, setTvshows] = useState([]);
  const [searchResult, setSearchResult] = useState(tvshows);

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
          <TVShowsList
            rating={rating}
            tvshows={tvshows}
            setTvshows={setTvshows}
          />
        </div>
      </div>
    </>
  );
}

export default Series;
