
import React, { Component } from 'react';

import { connect } from 'react-redux';
import {Row, Container} from 'react-bootstrap';


import BookCard from './BookCard';

export class BooksContainer extends Component {
  render() {
    let content = '';
    content = ''
    console.log("Books Container passsed contents ", this.props.predicted_book)
    content = this.props.predicted_book.map((book, index) =>{
        let thumbnail = '';
        if (book.volumeInfo.imageLinks) {
            thumbnail = book.volumeInfo.imageLinks.thumbnail;
        }
        return <BookCard key={index} book={book} pred={true}
        thumbnail={thumbnail}
        title={book.volumeInfo.title}
        pageCount={book.volumeInfo.pageCount}
        language={book.volumeInfo.language}
        authors={book.volumeInfo.authors}
        publisher={book.volumeInfo.publisher}
        description={book.volumeInfo.description}
        previewLink={book.volumeInfo.previewLink}
        infoLink={book.volumeInfo.infoLink}
        />
    })
    
  return <Container fluid>
      <Row lg={4}>
      {content}
      {/* <ToastContainer /> */}
  </Row>
  </Container>
  
}
}

const mapStateToProps = state => ({
    predicted_book:state.movies.predicted_book
});
export default connect(mapStateToProps)(BooksContainer);
