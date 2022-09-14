import React from 'react';
import { connect } from 'react-redux';
import { getDetails } from '../../actions/index';

import './Movie.css';

class Movie extends React.Component {

    componentDidMount(){

        const id = this.props.match.params.id;

        this.props.getMovieDetail(id);

    }

    render() {
        return (
            this.props.movie ? <div className="movie-detail">
                Detalle de la pelicula 
                <h2>{`Title: ${this.props.movie.Title}...`}</h2>
                <img src={this.props.movie.Poster}/>
                <h4>{`Year: ${this.props.movie.Year}...`}</h4>
                <h4>{`Genre: ${this.props.movie.Genre}...`}</h4>
                <h4>{`Actors: ${this.props.movie.Actors}...`}</h4>
                <h4>{`Awards: ${this.props.movie.Awards}...`}</h4>
            </div> : <div>... loading</div>
        );
    }
}



/*function Movie(props){

    let id = props.params.id
    let {id} = useParams()
 } */

function mapStateToProps(state){

    return{
        movie: state.movieDetails
    }
}

function mapDispatchToProps(dispatch){
   return {
    getMovieDetail: id => dispatch(getDetails(id))
}
}


export default connect(mapStateToProps, mapDispatchToProps)(Movie)

// export default (Movie);