import React from "react";
// import { connect } from "react-redux";
import "./Home.css";
import { getPokemons,filterCreated, orderByName, orderByAttack } from "../../redux/actions";
import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import SearchBar from "../SearchBar/SearchBar";

export default function Home(){

    //constante para despachar acciones
    const dispatch = useDispatch();

    //trae todos los estados
    const allPokemons = useSelector((state) => state.pokemons);

    //Estado local sobre el paginado

    const[currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage,setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon);
    const[order, setOrder] = useState('');

    const paging = (pageNumber)=>{
        setCurrentPage(pageNumber)
    };

    //despacho la accion getPokemons

    useEffect(()=>{
        dispatch(getPokemons())
    },[dispatch])

    //Despacho la accion getPokemons a lhacer click

    function handleClick(element){
        element.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterCreated(element){
        element.preventDefault();
        dispatch(filterCreated(element.target.value))
    }

    function handleSortName(element){
        element.preventDefault();
        dispatch(orderByName(element.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${element.target.value}`)
    }

    function handleSortAttack(element){
        element.preventDefault();
        dispatch(orderByAttack(element.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${element.target.value}`)
    }


    return(
        <div className="home" key={Math.random()}>
        <SearchBar/>
        <h1>Web Pokedex</h1>
        <hr/>
        <button onClick={element=>{handleClick(element)}}
        >
        Volver a cargar Pokemons!
        </button>
        <Link to= '/pokemon'><button>Crear Pokemon!</button></Link>
        <div className="background">

            {/*Ordenamiento Ascendente y Descendente, orden alfabetico y por ataque*/}

            <select onChange={element => handleSortName(element)}>
                <option value = 'asc'>A - Z!</option>
                <option value = 'desc'>Z - A!</option>
            </select>

            {/*Ordenamiento por ataque*/}

            <select onChange={element => handleSortAttack(element)}>
                <option value = 'asc'>Mayor ataque!</option>
                <option value = 'desc'>Menor ataque!</option>
            </select>

            {/*Filtro por API o Base de Datos*/}

            <select 
            onChange={element => handleFilterCreated(element)}
            >
                <option value='all'>Pokemon API y Base de datos!</option>
                <option value='api'>Pokemons API!</option>
                <option value='created'>Pokemons Base de datos!</option>
            </select>

            {/*Filtro por Tipo*/}

            <hr/>

            {/*Renderizo las cartas de los pokemon en Home*/}
            <div className='container' >{
                currentPokemons?.map((element)=>{
                    return(
                        <div className="cards" key={element.id}>
                            <Card 
                            key={element.id}
                            id={element.id}
                            name={element.name} 
                            img={element.img}
                            types={element.types}
                            height={element.height}
                            />
                    </div>
                    );
                })
            }                    
            </div>
            <div className="paging">
            <Paging
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paging = {paging}>    
            </Paging>
            </div>
        </div>

        </div>
    )
    
}
