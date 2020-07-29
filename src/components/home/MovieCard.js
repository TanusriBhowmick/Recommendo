import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    userId
  } from '../../actions/searchActions';


export class MovieCard extends Component {

onAdd =(id)=>{
this.props.userId(id);
console.log(id);
}
  render() {
    const { movie } = this.props;
    let addButton = ''
    if(this.props.pred===false){
      addButton = <button type="button" className="btn btn-primary btn-bg mt-3" onClick={() => (this.onAdd(movie.imdbID))}>
          Add
      </button>
    }
    return (
   
      <div className="col-md-3 mb-5">
        <div className="card card-body bg-dark text-center h-100">
          <img className="w-100 mb-2" src={movie.Poster} alt="Movie Cover" />
          <h5 className="text-light card-title">
            {movie.Title} - {movie.Year}
          </h5>
          <Link className="btn btn-primary" to={'/movie/' + movie.imdbID}>
            Movie Details
            <i className="fas fa-chevron-right" />
          </Link>
          {addButton}
        </div>
      </div>
     
        

    );
  }
}
const mapStateToProps = state => ({
   user: state.movies.predicted
});

export default connect(mapStateToProps, {userId})(MovieCard);