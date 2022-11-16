import React from "react";
import { connect } from "react-redux";
import { getDogs, filterDogsByStatus, filterCreated, orderByName } from "../redux/actions";
import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import Card from "./Card";
import Paging from "./Paging";
import SearchBar from "./SearchBar";

export default function Home(){

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const[currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage,setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog);
    const[order, setOrder] = useState('');

    const paging = (pageNumber)=>{
        setCurrentPage(pageNumber)
    };

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    function handleClick(element){
        element.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterStatus(event){
        dispatch(filterDogsByStatus(event.target.value))
    }

    function handleFilterCreated(element){
        dispatch(filterCreated(element.target.value))
    }

    function handleSort(element){
        element.preventDefault();
        dispatch(orderByName(element.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${element.target.value}`)
    }

    return(
        <div key={Math.random()}>
                    {/* <Link to='/dog'>Crear perro</Link> */}
        <SearchBar/>
        <hr/>
        <button
        onClick={element=>{handleClick(element)}}
        >
        Volver a cargar perros!
        </button>
        <div
        >
            <select 
            onChange={element => handleSort(element)}
            >
                <option value = 'asc'>Ascendente!</option>
                <option value = 'desc'>Descendente!</option>
            </select>
            <select
            >
                <option value = 'weigt'>Peso maximo!</option>
                <option value = 'minWei'>Peso minimo!</option>
            </select>
            <select 
            onChange={element => handleFilterCreated(element)}
            >
                <option value='All'>Todos los perros!</option>
                <option value='api'>Perros API!</option>
                <option value='created'>Perros creados!</option>
            </select>
            <select 
            onChange={element => handleFilterStatus(element)}
            >
                <option 
                value = 'temperament'
                >
                    Temperamento!
                </option>
            </select>
            {
                currentDogs?.map((element)=>{
                    return(
                        <div key={Math.random()}>
                            {/* <Link to= {'/home/' + element.id}> */}
                            <Card 
                            name={element.name} 
                            image={element.image} 
                            max_weight={element.max_weight} 
                            min_weight={element.min_weight} 
                            temperament={element.temperament}
                            reference_image_id={element.reference_image_id}
                            key = {element.id}
                            />
                            {/* </Link> */}
                    </div>
                    );
                })
            }
            <Paging
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paging = {paging}>    
            </Paging>
        </div>

        </div>
    )
    
}

// class Home extends React.Component{

//     constructor(props){
//         super(props)
//     }

//     componentDidMount(){this.props.getDogs};

//     render(){
//         return(
//             <>
//             <h2>Home</h2>
//             </>
            
//         )    
//     }
// };

// const mapStateToProps = (state) =>{
//     return{
//         allDogs: state.allDogs
//     }
// };
// const mapDispatchToProps = (dispatch) =>{
//     return{
//         getDogs:()=>dispatch(getDogs())
//     }
// };



// export default connect(mapStateToProps, mapDispatchToProps)(Home);