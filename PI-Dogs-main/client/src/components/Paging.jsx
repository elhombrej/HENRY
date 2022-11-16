import React from "react";

export default function Paging({dogsPerPage, allDogs,paging}){
    const pageNumbers = [];

    for(let i=0;i<=Math.ceil(allDogs/dogsPerPage);i++){
        pageNumbers.push(i+1)
    };

    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number =>(
                    <li key={number}>
                    <a onClick={()=> paging(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}