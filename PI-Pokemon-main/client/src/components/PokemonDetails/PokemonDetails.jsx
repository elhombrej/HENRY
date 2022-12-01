import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/actions";

export default function PokemonDetails(props){
  console.log(props);
  const dispatch = useDispatch();

  useEffect(()=>{dispatch(getPokemonDetail(props.match.params.id))})

  const pokemon = useSelector(state=>(state.pokemonDetail));

  console.log(pokemon)
  console.log(pokemon[0])
  console.log(pokemon[0].name)
  
  return(
    <div>
      {pokemon ?
      <div>
        <h1>{pokemon[0].name.toString().toUpperCase() + "!"}</h1>
        <img src={pokemon[0].img} alt={"Imagen desaparecida!"} width={"400"} height={"400px"}/>
        <h2>Puntos de Vida!: {pokemon[0].hp}</h2>
        <h2>Puntos de Ataque!: {pokemon[0].attack}</h2>
        <h2>Puntos de Defensa!: {pokemon[0].defense}</h2>
        <h2>Puntos de Velocidad!: {pokemon[0].speed}</h2>
        <h2>Alto!: {pokemon[0].height} pies</h2>
        <h2>Peso!: {pokemon[0].weight} kg</h2>
        <h2>Tipos!: {pokemon[0].types.map(element=>"-"+element.name.toString()+"-")}</h2>
      </div>
    
          :
          <div>Loading...</div>
    }
    <Link to='/home'>
      <button>Inicio</button>
    </Link>
    </div>
  )
}
