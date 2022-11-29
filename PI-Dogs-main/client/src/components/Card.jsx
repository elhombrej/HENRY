import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, max_weight, min_weight, temperament,reference_image_id, image}) {
  return (
    <>
        {/* <div key={id}> */}
          <div>
          <Link to={`/dog/${name}`}>
            <h1>{name}</h1>
            </Link>
          <img src={image ? image : `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`} alt={"La imagen se escapo!"} width='350px' height= '300px'/>
          {!temperament ? 
          (
            <p>Temperament Not found</p>
            ) : (
              <p>Temperament: {temperament}</p>
            )}
            <p>Max weight: {max_weight} kg</p>   
            <p>Min weight: {min_weight} kg</p>          
          </div>
        {/* </div> */}
        <hr/>
    </>
  );
};