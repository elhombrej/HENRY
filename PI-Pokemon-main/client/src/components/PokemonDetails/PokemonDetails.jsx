import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemons, getPokemonByName } from "../../redux/actions/index";
import Loader from "../Loader/Loader";
// import img from "../../images/pokemoncreated.png";
// import style from "../pokemonDetails/pokemonDetails.module.css";

const PokemonDetails = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const allPokemons = useSelector((state) => state.allPokemons);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    allPokemons.length > 0 ? 
    setPokemon(allPokemons.find((d) => d.name === name)): 
    setPokemon({});
  }, [allPokemons, name]);

  return (
    <>
    {typeof pokemon === "object" && Object.keys(pokemon).length > 0 ? (
        <article>
            <img src={pokemon.img ? pokemon.image : "No hay Pokemon!"} alt={`img-${pokemon.name}`}
              />
        <section>
          <h1>{pokemon.name}</h1>
          {pokemon.types ? (
          <p>
              <b>types: </b> {pokemon.types}
          </p>) : 
          (<p>
              <b>types:</b> 'pokemon types Not Found'
          </p>)}
          <p>
            <b>Min height:</b> {pokemon.min_height} cm
          </p>
          <p>
            <b>Max height:</b> {pokemon.max_height} cm
          </p>
          <p>
            <b>Min weight:</b> {pokemon.min_weight} kg
          </p>
          <p>
            <b>Max weight:</b> {pokemon.max_weight} kg
          </p>
          <p>
            <b>Life span:</b> {pokemon.life_span}
          </p>
        </section>
      </article>
    ) : (
       <Loader />
    )}
</>
);
};

export default PokemonDetails;
