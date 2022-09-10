import React from 'react';
import Card from './Card';
import style from '../styles/Cards.module.css';

export default function Cards(props) {
  // acá va tu código
  // tip, podés usar un map

  if(!props.cities) return <h1>No hay ciudades</h1>

  return (<div className={style.componente}>{props.cities && props.cities.map(city => (<Card name={city.name} min={city.main.temp_min} max={city.main.temp_max} img={city.weather[0].icon} onClose={()=> alert (city.name)} key={city.id}/> 
      ))     
}
  </div>)
};