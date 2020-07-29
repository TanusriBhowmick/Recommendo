import {
  SEARCH_MOVIE,
  FETCH_MOVIES,
  FETCH_MOVIE,
  LOADING,
  GET_MOVIE,
  GET_BOOK,
  EMPTY_PRED_MOVIES,
  EMPTY_USER_MOVIES,
  USER_ID,
  USER_BOOKS,
  EMPTY_BOOKS,
  EMPTY_PRED_BOOKS
} from '../actions/types';

const initialState = {
  text: '',
  movies: [],
  loading: false,
  movie: [],
  predicted: [],
  user:[],
  books:[],
  predicted_book:[]

};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MOVIE:
      return {
        ...state,
        text: action.payload,
        loading: false
      };
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false
      };
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MOVIE:
      return {
        ...state,
        predicted: [
          ...state.predicted,
          action.payload
        ]
      };
      case GET_BOOK:
        return{
          ...state,
          predicted_book:[
            ...state.predicted_book,
            action.payload
          ]
        };
    case EMPTY_PRED_MOVIES:
      return {
        ...state,
        predicted: []
      }
    case EMPTY_USER_MOVIES:
      return {
        ...state,
        user: []
      }
    case EMPTY_BOOKS:
      return{
        ...state,
        books:[]
      } 
    case EMPTY_PRED_BOOKS:
      return{
        ...state,
        predicted_book: []
      }
    case USER_ID:
      return{
        ...state,
        user:[
           ...state.user,
           action.payload
        ]
      };
     case USER_BOOKS:
       return{
         ...state,
          books:[
           ...state.books,
           action.payload
         ]
       }; 
    default:
      return state;
  }
}