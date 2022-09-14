// function actionMovies(movies){

//     return{type: 'GET_MOVIES', movies}
// }

import {GET_MOVIES, GET_DETAILS, ADD_MOVIE_FAVORITE, REMOVE_MOVIE_FAVORITE} from "./constants";

export function getDetails(id){

    return function(dispatch){
        return fetch(`http://www.omdbapi.com/?apikey=3791a38b&i=${id}`)
        .then(response => response.json())
        .then(json => dispatch({type:GET_DETAILS, movie: json}))
    }
}

export function getMovies(title){
    return function(dispatch){
        return fetch(`http://www.omdbapi.com/?apikey=3791a38b&s=${title}`)
        .then(response => response.json())
        .then(json=>dispatch({type: GET_MOVIES, movies:json}))
    }

}

export function addMovieFavorite(movie){
    return { type: ADD_MOVIE_FAVORITE, movie}
}

export function removeFavorite(id){

    return{
        type: REMOVE_MOVIE_FAVORITE,id
    }
} 