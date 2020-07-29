import React from 'react';
import { MoviesContainer } from './MoviesContainer';
import { connect } from 'react-redux';
import {
    getMovie,
    emptyPredMovies
  } from '../../actions/searchActions';


class Predicted extends React.Component{
    componentDidMount(){
        this.props.emptyPredMovies()
    }
    
    render()
    {
        return(
            <div>
            <MoviesContainer pred={true} predicted={this.props.predicted}/>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    loading: state.movies.loading,
    predicted: state.movies.predicted
  });

export default connect(mapStateToProps, {getMovie, emptyPredMovies})(Predicted);
