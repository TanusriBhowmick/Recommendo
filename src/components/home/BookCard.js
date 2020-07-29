import React, { useState} from 'react';
import {connect} from 'react-redux';
import { Card, CardTitle, CardImg, CardBody, Button, Modal, Col } from 'reactstrap';
//import PredictedBooks from './PredictedBooks';
import {userBooks} from '../../actions/searchActions';


const BookCard = ({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  previewLink,
  infoLink,
  onTap
  

 
}) => {
  // States
 

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
 

  return (
    <Col>
    <Card style={{ width: '233px' }} className='m-auto '>
      <CardImg
        top
        style={{ width: '100%', height: '233px' }}
        src={thumbnail}
        alt={title}
      />
      <CardBody>
        <CardTitle className='card-title'>{title}</CardTitle>
        <Button onClick={toggle}>More info</Button>
        <Button onClick={() => onTap()}>
          Add
      </Button>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className='modal-header d-flex justify-content-center'>
          <h5 className='modal-title text-center' id='exampleModalLabel'>
            {title}
          </h5>
          <button
            aria-label='Close'
            className='close'
            type='button'
            onClick={toggle}
          >
            <span aria-hidden={true}>X</span>
          </button>
        </div>
        <div className='modal-body'>
          <div className='d-flex justify-content-between ml-3'>
            <img src={thumbnail} alt={title} style={{ height: '233px' }} />
            <div>
              <p>Page Count: {pageCount}</p>
              <p>Language : {language}</p>
              <p>Authors : {authors}</p>
              <p>Publisher : {publisher}</p>
            </div>
          </div>
          <div className='mt-3'>{description}</div>
        </div>
        <div className='modal-footer'>
          <div className='left-silde'>
            <a
              href={previewLink}
              className='btn-link'
              color='default'
              type='button'
              target='_blank'
              rel='noopener noreferrer'
            >
              Preview Link
            </a>
          </div>
          <div className='divider'></div>
          <div className='right-silde'>
            <a
              href={infoLink}
              className='btn-link'
              color='default'
              type='button'
              target='_blank'
              rel='noopener noreferrer'
            >
              Info Link
            </a>
          </div>
        </div>
      </Modal>
    </Card>
    </Col>
  );

};

const mapStateToProps = function(state){
  return{
     books:state.movies.books
  }
}

export default connect(mapStateToProps,{userBooks})(BookCard);