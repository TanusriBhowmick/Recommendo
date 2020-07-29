import React, { useState} from 'react';
import {connect} from 'react-redux';

import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Spinner,

} from 'reactstrap';


import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import BookCard from './BookCard.js';
import {userBooks,emptyBooks,getBook, emptyPredBooks} from '../../actions/searchActions';





function LandingBook(props) {
  
      // States
  

  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
    // Handle Search


   
   const handleEnterButton=()=>{
    console.log("Sending movies selected ", props.books)
    props.emptyPredBooks()
    axios.post("http://localhost:8000/bookPreference",{ "id": props.books})
    .then(response=>{
      // console.log(response)
      for(let i of response.data){
        // this.setState({
        //   movies: [...this.state.movies, i]
        // })
        console.log("response data: ", i)
        props.getBook(i);
      }
      // console.log(this.state.movies)
      props.emptyBooks();
      props.history.push('/PredictedBooks')
     
    })
    .catch(error=>{
      console.log(error);
    })
   }
    const handleSubmit = () => {
        setLoading(true);
        if (maxResults > 40 || maxResults < 1) {
          toast.error('max results must be between 1 and 40');
        } else {
          axios
            .get(
              `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
            )
            .then(res => {
              if (startIndex >= res.data.totalItems || startIndex < 1) {
                toast.error(
                  `max reults must be between 1 and ${res.data.totalItems}`
                );
              } else {
                if (res.data.items.length > 0) {
                  setCards(res.data.items);
                  setLoading(false);
                }
              }
            })
            .catch(err => {
              setLoading(true);
              console.log(err.response);
            });
        }
      };
    
 
        const Navbar = ()=>{
       return( <div>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">RECOMMENDO</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
            <i className="fa fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ml-auto">
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#services">Services</a>
              </li>
    
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#team">Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        </div>
       );
      }
      const mainHeader = () => {
        return (
            
            <div className='main-image d-flex justify-content-center align-items-center flex-column'>
              {/* Overlay */}
              <div className='filter'></div>
              <h1
                className='display-2 text-center text-white mb-3'
                style={{ zIndex: 2 }}
              >
                Google Books
              </h1>
              <div style={{ width: '60%', zIndex: 2 }}>
                <InputGroup size='lg' className='mb-3'>
                  <Input
                    placeholder='Book Search'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                  <InputGroupAddon addonType='append'>
                    <Button color='secondary' onClick={handleSubmit}>
                      <i className='fa fa-search'></i>
                      Search
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                <div className='d-flex text-white justify-content-center'>
                  <FormGroup >
                    <Label for='maxResults'>Max Results</Label>
                    <Input
                      type='number'
                      id='maxResults'
                      placeholder='Max Results'
                      value={maxResults}
                      onChange={e => setMaxResults(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className='ml-5'>
                    <Label for='startIndex'>Start Index</Label>
                    <Input
                      type='number'
                      id='startIndex'
                      placeholder='Start Index'
                      value={startIndex}
                      onChange={e => setStartIndex(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            
          );
    
      }
     
      const handleCards = () => {
        const addToState=(id)=>{
         
        
          
          
             props.userBooks(id) 
            console.log(props.books)
         
         }
        if (loading) {
          return (
            <div className='d-flex justify-content-center mt-3'>
              <Spinner style={{ width: '3rem', height: '3rem' }} />
            </div>
          );
        } else {
      
          const items = cards.map((item, i) => {
            let thumbnail = '';
            if (item.volumeInfo.imageLinks) {
              thumbnail = item.volumeInfo.imageLinks.thumbnail;
            }
    
            return (

              <div className='col-lg-4 mb-3' key={item.id}>
                                  
                <BookCard
                  thumbnail={thumbnail}
                  title={item.volumeInfo.title}
                  pageCount={item.volumeInfo.pageCount}
                  language={item.volumeInfo.language}
                  authors={item.volumeInfo.authors}
                  publisher={item.volumeInfo.publisher}
                  description={item.volumeInfo.description}
                  previewLink={item.volumeInfo.previewLink}
                  infoLink={item.volumeInfo.infoLink}
                  
                  onTap={()=>addToState(item.volumeInfo.industryIdentifiers[1].identifier)}
                  
                 pred={false}
                />
                
              </div>
              
            );
          });
          return (
            <div className='container my-5'>
              <div className='row'>{items}</div>
            </div>
          );
    
      }
    
      };
      return (
        <div className='w-100 h-100'>
            {Navbar()}
          {mainHeader()}
          {handleCards()}
          <ToastContainer />
          <div className="MyDiv">
            <Button onClick={handleEnterButton}><a href='/PredictedBooks'>Enter</a></Button>
         </div>
        </div>
         
      );
    
    }
  
    
  const mapStateToProps =function( state){
return{
      books:state.movies.books,
      predicted_book:state.movies.predicted_book
}
  }
    
    export default connect(mapStateToProps,{userBooks,emptyBooks,getBook, emptyPredBooks})(LandingBook)
