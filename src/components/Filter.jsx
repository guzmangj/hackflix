import React from "react";
import ReactStars from "react-rating-stars-component";

function Filter({ setRating }) {
  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex align-items-center text-light my-3">
        <div className="text-center">
          <p className="m-0">Filtrar por valoración:</p>
        </div>
        <div className="mx-3">
          <ReactStars
            count={5}
            onChange={handleRating}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
