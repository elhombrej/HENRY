import React from "react";
import { Link } from "react-router-dom";

const DogCard = ({ id, image, name, min_weight, max_weight, temperament }) => {
  return (
    <>
      <Link to={`/dog/${name}`}>
        <div key={id}>
          <div>
            <div>
              <img src={image ? image : img} alt={`dog-${name}`}/>
              <p>{name}</p>
            </div>
            <div>
              {!temperament ? (
                <p>
                  <b>Temperament:</b> Not found
                </p>
              ) : (
                <p>
                  <b>Temperament:</b> {temperament}
                </p>
              )}
              <p>
                <b>Min weight:</b> {min_weight} kg
              </p>
              <p>
                <b>Max weight:</b> {max_weight} kg
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default DogCard;
