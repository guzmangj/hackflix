import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Error404 from "../pages/Error404";
import YouTube from "react-youtube";
import PlayIcon from "../assets/PlayIcon";
import "./MovieDetails.css";

function TvShowDetails() {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [tvshowData, setTvshowData] = useState(null);
  const [tvshowTrailer, setTvshowTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getTvshowData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${params.id}?api_key=f1d02f62d0d4bc3ef480b7cf5aabfe87`
        );
        setTvshowData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    getTvshowData();

    const getTvshowTrailer = async () => {
      try {
        const trailers = await axios.get(
          `https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=f1d02f62d0d4bc3ef480b7cf5aabfe87`
        );
        setTvshowTrailer(trailers.data.results);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    getTvshowTrailer();
  }, []);

  const opts = {
    height: "700px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

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

  if (isError || !tvshowData || (!tvshowData && !tvshowTrailer)) {
    return (
      <>
        <Error404 />
      </>
    );
  }

  if (tvshowData && tvshowTrailer) {
    return (
      <section
        id="bgImage"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${tvshowData.backdrop_path}")`,
        }}
      >
        <div className="darker">
          <div className="container pt-5">
            <div className="row text-light movie-description rounded shadow-lg fade-in">
              <div className="col-md-12 col-xxl-5">
                <div className="py-3 poster-img">
                  <img
                    className="d-xxl-none img-fluid"
                    src={`https://image.tmdb.org/t/p/original/${tvshowData.backdrop_path}`}
                    alt={`${tvshowData.original_name} poster`}
                  />
                  <img
                    className="d-none d-xxl-block img-fluid poster-img"
                    src={`https://image.tmdb.org/t/p/original/${tvshowData.poster_path}`}
                    alt={`${tvshowData.original_name} poster`}
                  />
                </div>
              </div>
              <div className="col-md-12 col-xxl-7 data-column">
                <div className="py-4">
                  <h1 className="fs-2 fw-bold m-0">
                    {tvshowData.original_name} ({tvshowData.first_air_date})
                  </h1>
                </div>
                <div className="mt-4">
                  <h3 className="m-0 fs-4 fw-bold">Overview:</h3>
                  <p className="m-0 fs-6">{tvshowData.overview}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="mt-4">
                    <h3 className="m-0 fw-bold fs-6">Original language:</h3>
                    {tvshowData.original_language === "en" && (
                      <p className="m-0 fs-6">English</p>
                    )}
                    {tvshowData.original_language === "cn" && (
                      <p className="m-0 fs-6">Chinese</p>
                    )}
                    {tvshowData.original_language === "es" && (
                      <p className="m-0 fs-6">Spanish</p>
                    )}
                    {tvshowData.original_language === "fr" && (
                      <p className="m-0 fs-6">French</p>
                    )}
                    {tvshowData.original_language === "it" && (
                      <p className="m-0 fs-6">Italian</p>
                    )}
                    {tvshowData.original_language === "ro" && (
                      <p className="m-0 fs-6">Romanian</p>
                    )}
                    {tvshowData.original_language === "ja" && (
                      <p className="m-0 fs-6">Japanese</p>
                    )}
                    {tvshowData.original_language === "zh" && (
                      <p className="m-0 fs-6">Chinese</p>
                    )}
                    {tvshowData.original_language === "ko" && (
                      <p className="m-0 fs-6">Korean</p>
                    )}
                    {tvshowData.original_language === "tl" && (
                      <p className="m-0 fs-6">Tagalog</p>
                    )}
                    {tvshowData.original_language === "de" && (
                      <p className="m-0 fs-6">German</p>
                    )}
                    {tvshowData.original_language === "pl" && (
                      <p className="m-0 fs-6">Polish</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="m-0 fw-bold fs-6">Vote average:</h3>
                    <div className="d-xlg-flex align-items-center">
                      <div>
                        <p className="m-0 mt-2 fs-6 text-center">
                          {Math.round((tvshowData.vote_average * 10) / 10)} / 10
                        </p>
                      </div>
                      <div className="mx-2 mb-1 d-flex justify-content-center">
                        <ReactStars
                          count={5}
                          value={`${tvshowData.vote_average / 2 + 1}`}
                          size={24}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="my-4">
                    <h3 className="m-0 fs-6 fw-bold">Genres:</h3>
                    <div>
                      <ul className="p-0" style={{ listStyleType: "none" }}>
                        {tvshowData.genres.map((genre) => {
                          return <li className="movieGenre">{genre.name}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="m-0 fw-bold fs-6 mb-3">Trailer:</h3>
                  <div className="row g-2">
                    {tvshowTrailer.map((trailer) => (
                      <>
                        {trailer.type === "Trailer" && (
                          <>
                            <div
                              className="col-md-4"
                              onClick={() => setShow(true)}
                            >
                              <div className="text-center border mb-2 py-4 bg-black trailer-container">
                                <PlayIcon />
                              </div>
                              <p>{trailer.name}</p>
                            </div>
                            <Modal
                              centered="true"
                              size="xl"
                              show={show}
                              onHide={() => setShow(false)}
                              dialogClassName="modal-90w"
                              aria-labelledby="example-custom-modal-styling-title"
                            >
                              <Modal.Body className="p-0 bg-black">
                                <YouTube
                                  videoId={trailer.key}
                                  opts={opts}
                                  onPlay={() => setShow(true)}
                                />
                              </Modal.Body>
                            </Modal>
                          </>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TvShowDetails;
