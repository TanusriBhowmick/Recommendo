import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import MoviesContainer from './MoviesContainer';
import Spinner from '../layout/Spinner';
import {
  getMovie,
  emptyUserMovies,
  userId
} from '../../actions/searchActions';

// import {NavLink} from "react-router-dom";


export class Landing extends Component {
  // state={
  //   movies: []
  // }
  
  submitHandler=(e)=>{
    console.log("Sending movies selected ", this.props.user)
    axios.post("http://localhost:8000/moviePreference",{ "id": this.props.user})
    .then(response=>{
      // console.log(response)
      for(let i of response.data){
        // this.setState({
        //   movies: [...this.state.movies, i]
        // })
        this.props.getMovie(i)
      }
      // console.log(this.state.movies)
      this.props.emptyUserMovies();
      this.props.history.push('/Predicted')
    })
    .catch(error=>{
      console.log(error);
    })
  }
 
  render() {
    
    const { loading } = this.props;
    return (
      <div className="container">
        <SearchForm />
        {loading ? <Spinner /> : <MoviesContainer pred={false}/>}
        <div className="MyDiv">
        <button type='button' onClick={this.submitHandler}>Enter</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.movies.loading,
  user:state.movies.user
});

export default connect(mapStateToProps, {getMovie, emptyUserMovies, userId})(Landing);