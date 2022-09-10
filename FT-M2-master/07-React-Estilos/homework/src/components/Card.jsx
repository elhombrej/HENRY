import React from 'react';

import style from '../styles/Card.module.css';

export default function Card({max,min,name,img,onClose}) {
  // acá va tu código
  return <div className={style.background}>

<button className={style.buttonStyle} onClick = {onClose}>Close</button>
    <h4>{name}</h4>
    <img src = {`http://openweathermap.org/img/wn/${img}@2x.png`} alt ={"img"}></img>
    <div>
      <p>Min</p>
      <p>{min}</p>
      <p>Max</p>
      <p>{max}</p>
    </div>
     <hr/>
  </div>
};