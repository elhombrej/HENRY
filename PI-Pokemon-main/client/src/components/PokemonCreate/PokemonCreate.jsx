import React, {useState, useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import {postPokemon,getTypes} from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state)=> state.types);

    const [input,setInput] = useState({
        name:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        img:"",
        types:[]
    })

    function handleChange(element){
        setInput({
            ...input,
            [element.target.name]: element.target.value
        })
        console.log(input)
    }

    function handleSelect(element){
        setInput({
            ...input,
            types:[...input.types, element.target.value]
        })
    }

    function handleSubmit(element){
        try{element.preventDefault();
        console.log(input);
        dispatch(postPokemon(input))
        alert('Pokemon creado!');
        setInput({
            name:"",
            hp:"",
            attack:"",
            defense:"",
            speed:"",
            height:"",
            weight:"",
            img:"",
            types:[]
            })}catch(error){alert(error)}
        history.push('/home');
    }

    useEffect(()=>{
        dispatch(getTypes());
    },[dispatch]);

    return(

        <div>
            <Link to= '/home'><button>Volver al inicio!</button></Link>
            <h1>Crea tu Pokemon!</h1>

            <form onSubmit={(element)=> handleSubmit(element)}>
                <div>
                    <label>Nombre:</label>
                    <input
                    type='text'
                    value= {input.name}
                    name='name'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Puntos de vida:</label>
                    <input
                    type='text'
                    value= {input.hp}
                    name='hp'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Image URL:</label>
                    <input
                    type='text'
                    value= {input.img}
                    name='img'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Ataque:</label>
                    <input
                    type='text'
                    value= {input.attack}
                    name='attack'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Defensa:</label>
                    <input
                    type='text'
                    value= {input.defense}
                    name='defense'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Velocidad:</label>
                    <input
                    type='text'
                    value= {input.speed}
                    name='speed'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Altura:</label>
                    <input
                    type='text'
                    value= {input.height}
                    name='height'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Peso:</label>
                    <input
                    type='text'
                    value= {input.weight}
                    name='weight'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <select onChange={(element)=>handleSelect(element)}>
                    {types.map((element)=>(
                        <option key={Math.random()} value={element.name}>{element.name}</option>
                    ))}
                </select>

                <ul>
                    <div>
                        {input.types.map((element)=>
                        <li className="chosenTypes" key={Math.random()}>{element + " ,"}{console.log(element)}</li>)}
                    </div>
                </ul>

                <button types='submit'>Crear!</button>
            </form>
        </div>
    )
}

