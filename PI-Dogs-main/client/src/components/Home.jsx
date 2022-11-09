import { Link } from "react-router-dom";

function Home(){

    return (
        <div className= "div-container-home">
            {/* <div className= "div-perrito-container">
                <img className= "foto-perrito-home" src= {FotoPerrito}></img>
            </div> */}
                <div className= "titulo-home-container">
                    <p className= "titulo-home">Henry Dogs</p>
                </div> 
                <div className= "div-subtitulo-home-container">
                    <p className= "subtitulo-home">Pagina principal de perritos</p>
                    <Link to= "/buscar"><button className= "boton-home">ver más</button> </Link>                      
                </div>
    </div>
    )
};

export default Home;