import React from 'react';

import styles from '../styles/SearchBar.module.css '

export default function SearchBar({onSearch}) {
  // acá va tu código
  return (<div className={styles.estilos}> 

    <input type={"text"} placeholder={"Ingrese ciudad"} />

    <button className={styles.buttonSearch} onClick={() => onSearch("Una ciudad")}> Agregar </button>
    
  </div>)
};