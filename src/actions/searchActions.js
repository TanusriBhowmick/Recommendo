import { SEARCH_MOVIE, FETCH_MOVIES, FETCH_MOVIE, LOADING , GET_MOVIE, GET_BOOK, EMPTY_PRED_MOVIES,EMPTY_USER_MOVIES,USER_ID,USER_BOOKS,EMPTY_BOOKS, EMPTY_PRED_BOOKS} from './types';
import axios from 'axios';

import { APIKey } from '../APIKey';




export const searchMovie =text => dispatch => {
  dispatch({
    type: SEARCH_MOVIE,
    payload: text
  });
};

export const fetchMovies = text => dispatch => {
  axios
    .get(`https://www.omdbapi.com/?apikey=${APIKey}&s=${text}`)
    .then(response =>
      dispatch({
        type: FETCH_MOVIES,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};    

export const fetchMovie = id => dispatch => {
  axios
    .get(`https://www.omdbapi.com/?apikey=${APIKey}&i=${id}`)
    .then(response =>
      dispatch({
        type: FETCH_MOVIE,
        payload: response.data
      })
      
    )
    .catch(err => console.log(err));    
};
export const userId =id =>{
  return{
    type:USER_ID,
    payload:id

  }
};
export const userBooks=id=>{
  return{
    type:USER_BOOKS,
    payload:id
  }
    
};
export const getMovie = id => dispatch => {
  axios.get(`https://www.omdbapi.com/?apikey=${APIKey}&i=${id}`)
    .then(response=> {
      return dispatch({type: GET_MOVIE,
        payload: response.data
      })
    }
      
      )
}
export const getBook=id=>dispatch=>{
  axios.get( `https://www.googleapis.com/books/v1/volumes?q=isbn:${id}&maxResults=1`)
  .then(response=>{
    return dispatch({type:GET_BOOK,
     payload:response.data.items[0]
  })
  })
}

export const emptyPredMovies = () => {
  return {
    type: EMPTY_PRED_MOVIES
  }
}
export const emptyUserMovies=()=>{
  return{
    type:EMPTY_USER_MOVIES
  }
}
export const emptyBooks=()=>{
  return{
    type:EMPTY_BOOKS
  }
}
export const setLoading = () => {
  return {
    type: LOADING
  }

};
export const emptyPredBooks = ()=>{
  return {
    type: EMPTY_PRED_BOOKS
  }
}