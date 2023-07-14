import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Error404 from "../pages/Error404";

function MovieDetails() {
  const params = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=f1d02f62d0d4bc3ef480b7cf5aabfe87`
        );
        setMovieData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    getMovieData();
  }, []);

  if (isLoading) {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </>
    );
  }

  if (isError || !movieData) {
    return (
      <>
        <Error404 />
      </>
    );
  }

  if (movieData) {
    return (
      <div className="row text-light">
        <div className="col-5">
          <div className="pt-3 ">
            <img
              className="img-fluid"
              src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
              alt={`${movieData.original_title} poster`}
            />
          </div>
        </div>
        <div className="col-7">
          <div className="py-3 bg-black ">
            <h1 className="fs-4">
              {movieData.original_title} ({movieData.release_date})
            </h1>
          </div>
          <div className="mt-4">
            <h3 className="m-0 fs-5">Overview:</h3>
            <p className="m-0 fs-6">{movieData.overview}</p>
          </div>
          <div className="mt-4">
            <h3 className="m-0 fs-6">Original language:</h3>
            <p className="m-0 fs-6">{movieData.original_language}`</p>
          </div>
          <div className="mt-4">
            <h3 className="m-0 fs-6">Vote average:</h3>
            <div className="d-flex align-items-center">
              <div>
                <p className="m-0 fs-6">{movieData.vote_average}</p>
              </div>
              <div className="mx-2 mb-1">
                <ReactStars
                  count={5}
                  value={`${movieData.vote_average / 2 + 1}`}
                  size={24}
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="m-0 fs-6">Genres:</h3>
            <div className="d-flex">
              {movieData.genres.map((genre) => {
                return <p className="movieGenre">{genre.name},</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
