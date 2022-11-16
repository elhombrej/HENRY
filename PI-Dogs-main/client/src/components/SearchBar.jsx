import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../redux/actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    
    function handleInputChange(element){
        element.preventDefault();
        setName(element.target.value)
        console.log(name)       
    }

    function handleSubmit(element){
        element.preventDefault();
        dispatch(getNameDogs(name));
    }

    return(
        <div>
            <input
            type = 'text'
            placeholder = 'Buscar'
            onChange = {(element)=> handleInputChange(element)}/>
                <button type = 'submit'
                onClick={(element) =>handleSubmit(element)}>
                    Buscar!
                </button>
        </div>
    )
}