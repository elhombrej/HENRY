import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Favorites.css';
import { removeFavorite } from "../../actions";

export class ConnectedList extends Component {

  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        <ul>
          {/* Aqui deberias poner tu lista de peliculas! */}
          {this.props.favorites && this.props.favorites.map(movie=>
            <div key= {movie.id}>

              <Link to = {`/movie/${movie.id}`}>{movie.title}</Link>
              <button onClick={()=>this.props.removeFavorite(movie.id)}>Remove favorite</button>
            </div>
            )
            }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){

  return{

    favorites: state.moviesFavorites

  }
}

function mapDispatchToProps(dispatch){

  return{

    removeFavorite: (id) => dispatch(removeFavorite(id))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(ConnectedList);

// export default (ConnectedList);
