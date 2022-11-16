import React, {useState, useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import {postDog,getTemperaments} from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";

export default function DogCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state)=> state.temperaments);

    const [input,setInput] = useState({
        name:'',
        image:'',
        min_height:'',
        max_height:'',
        min_weight:'',
        max_weight:'',
        min_life_span:'',
        max_life_span:'',
        temperament:[]
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
            temperament:[...input.temperament, element.target.value]
        })
    }

    function handleSubmit(element){
        element.preventDefault();
        console.log(input);
        dispatch(postDog(input))
        alert('Perro creado!');
        setInput({
            name:'',
            image:'',
            min_height:'',
            max_height:'',
            min_weight:'',
            max_weight:'',
            min_life_span:'',
            max_life_span:'',
            temperament:[]     
        })
        history.push('/home');
    }

    useEffect(()=>{
        dispatch(getTemperaments());
    },[]);

    return(

        <div>
            <Link to= '/home'><button>Volver a home!</button></Link>
            <h1>Crea tu perro!</h1>

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
                    <label>Image URL:</label>
                    <input
                    type='text'
                    value= {input.image}
                    name='image'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Min height:</label>
                    <input
                    type='text'
                    value= {input.min_height}
                    name='min_height'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Max height:</label>
                    <input
                    type='text'
                    value= {input.max_height}
                    name='max_height'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Min weight:</label>
                    <input
                    type='text'
                    value= {input.min_weight}
                    name='min_weight'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Max weight:</label>
                    <input
                    type='text'
                    value= {input.max_weight}
                    name='max_weight'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Min life span:</label>
                    <input
                    type='text'
                    value= {input.min_life_span}
                    name='min_life_span'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <div>
                    <label>Max life span:</label>
                    <input
                    type='text'
                    value= {input.max_life_span}
                    name='max_life_span'
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>

                <select onChange={(element)=>handleSelect(element)}>
                    {temperaments.map((tem)=>(
                        <option key={Math.random()} value={tem.name}>{tem.name}</option>
                    ))}
                </select>

                <ul>
                    <li>
                        {input.temperament.map((element)=>element + ',')}
                    </li>
                </ul>

                <button type='submit'>Crear!</button>
            </form>
        </div>
    )
}

