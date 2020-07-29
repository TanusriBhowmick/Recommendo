import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter , Route,Switch } from 'react-router-dom';

import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './Home';
import Landing from './components/home/Landing';
import LandingBook from './components/home/LandingBook';
import Movie from './components/home/Movie';
import SearchForm from './components/home/SearchForm';
import MovieCard from './components/home/MovieCard';
import MoviesContainer from './components/home/MoviesContainer';
import Spinner from './components/layout/Spinner';
import Predicted from './components/home/Predicted';
import store from './store';
import BookCard from './components/home/BookCard';
import PredictedBooks from './components/home/PredictedBooks';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Landing" component={Landing}/>
            <Route exact path="/LandingBook" component={LandingBook}/>
            <Route exact path="/SearchForm" component={SearchForm}/>
            <Route exact path="/Movie/:id" component={Movie}/>
            <Route exact path="/Moviecard" component={MovieCard}/>
            <Route exact path="/MoviesContainer" component={MoviesContainer}/>
            <Route exact path="/Spinner" component={Spinner}/>
            <Route exact path="/Predicted" component={Predicted}/>
            <Route exact path="/PredictedBooks" component={PredictedBooks}/>
            <Route exact path="/BookCard" component={BookCard}/>
            </Switch>
            
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
