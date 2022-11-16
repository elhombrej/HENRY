import { Link } from "react-router-dom";
import React from "react";

function LandingPage(){

    return (
        <div className= "div-container-home">
            <h2 className= "titulo-home">Landing Page</h2>
            <Link to= "/home"><button className= "boton-home">Ingresar!</button> </Link>                      
    </div>
    )
};

export default LandingPage;