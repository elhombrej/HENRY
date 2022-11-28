import React from "react";
import "./Paging.css"

export default function Paging({pokemonsPerPage, allPokemons,paging}){
    const pageNumbers = [];

    for(let i=0;i<=Math.ceil(allPokemons/pokemonsPerPage);i++){
        pageNumbers.push(i+1)
    };

    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number =>(
                    <li key={number}>
                    <a classname="number" onClick={()=> paging(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}