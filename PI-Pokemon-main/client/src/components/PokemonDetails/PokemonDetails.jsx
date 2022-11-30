import './PokemonDetails.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemons, getPokemonByName } from "../../redux/actions/index";
import Loader from "../Loader/Loader";
// import img from "../../images/pokemoncreated.png";
// import style from "../pokemonDetails/pokemonDetails.module.css";

const PokemonDetails = async () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const pokemonFromState = useSelector((state) => state.pokemons);
  // const [pokemon, setPokemon] = useState({name});

  useEffect(() => {
    dispatch(getPokemonByName(name));
  }, [dispatch]);

  const pokemon = pokemonFromState[0];
  console.log(pokemon)
  // useEffect(() => {
  //   allPokemons.length > 0 ? 
  //   setPokemon(allPokemons.find((element) => element.name === name)): 
  //   setPokemon({});
  // }, [allPokemons, name]);

  return (
    {if(pokemon){
    <div className="details">{name}
    {/* {pokemon ? ( */}
        <article>
            <img src={pokemon.img} alt={pokemon.name}/>
        <section>
          <h1>{pokemon.name}</h1>            
          <p>
              <b>types: </b> {pokemon.types}
          </p>
          <p>
            <b>Puntos de vida:</b> {pokemon.hp} Puntos
          </p>
          <p>
            <b>Ataque:</b> {pokemon.attack} Puntos
          </p>
          <p>
            <b>Defensa:</b> {pokemon.defense} Puntos
          </p>
          <p>
            <b>Velocidad:</b> {pokemon.speed} Puntos
          </p>
          <p>
            <b>Altura:</b> {pokemon.height} Pies
          </p>
          <p>
            <b>Peso:</b> {pokemon.weight} Kg
          </p>
        </section>
      </article>
     {/* ) : (
        <Loader />
     )} */}
</div>}}
);
};

export default PokemonDetails;
