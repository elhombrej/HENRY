import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogs } from "../redux/actions";
import Header from "../components/Header";
import Loader from "../components/Loader";
// import img from "../../images/dogcreated.png";
// import style from "../DogDetails/DogDetails.module.css";

const DogDetails = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const allDogs = useSelector((state) => state.allDogs);
  const [dog, setDog] = useState({});

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    allDogs.length > 0
      ? setDog(allDogs.find((d) => d.name === name))
      : setDog({});
  }, [allDogs, name]);

  return (
    <>
    <div>
        <Header/>
    </div>
    {typeof dog === "object" && Object.keys(dog).length > 0 ? (
        <article>
            <img src={dog.image ? dog.image : "No hay perrito"} alt={`img-${dog.name}`}
              />
        <section>
          <h1>{dog.name}</h1>
          {dog.temperament ? (
          <p>
              <b>Temperament: </b> {dog.temperament}
          </p>) : 
          (<p>
              <b>Temperament:</b> 'Dog Temperament Not Found'
          </p>)}
          <p>
            <b>Min height:</b> {dog.min_height} cm
          </p>
          <p>
            <b>Max height:</b> {dog.max_height} cm
          </p>
          <p>
            <b>Min weight:</b> {dog.min_weight} kg
          </p>
          <p>
            <b>Max weight:</b> {dog.max_weight} kg
          </p>
          <p>
            <b>Life span:</b> {dog.life_span}
          </p>
        </section>
      </article>
    ) : (
       <Loader />
    )}
</>
);
};

export default DogDetails;
