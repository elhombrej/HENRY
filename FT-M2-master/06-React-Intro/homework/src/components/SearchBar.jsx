import React from 'react';

export default function SearchBar({onSearch}) {
  // acá va tu código
  return (<div> 

    <input type={"text"} placeholder={"Ingrese ciudad"} />

    <button onClick={() => onSearch("Una ciudad")}> Agregar </button>
    
  </div>)
};