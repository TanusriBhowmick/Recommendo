import React from 'react';
import axios from 'axios';



import { connect } from 'react-redux';
import {emptyBooks} from '../../actions/searchActions';
import BooksContainer from './BooksContainer';


class PredictedBooks extends React.Component{
  componentDidMount(){
      this.props.emptyBooks()
      axios.get( `https://www.googleapis.com/books/v1/volumes?q=isbn:0451203771&maxResults=1`)
      .then(response=>{
        console.log(response.data.items[0])
      })
  }
  
  render()
  {
      return(
          <div>
          <BooksContainer pred={true} predicted={this.props.predicted}/>
          </div>
      );
  }
}



// const PredictedBooks= props =>{
// {
 
 
    
//     const predicted=true;
    
//     const cards = []
 
   
//     const mainFunc = (bookId)=>{
//       console.log("In main function of predicted books", props.predicted_book)
//       for(let i=0;i<props.predicted_book.length;i++)
//       {
//           if(predicted===true)
//       {
//           axios.get(
//             `https://www.googleapis.com/books/v1/volumes?q=isbn:${props.predicted_book[i]}&maxResults=2`
//           )
//           .then(res=>{
//             console.log("Predicted response ", res.data)
//             cards.push(res.data);
        
//           })
//           .catch(err => {
         
//             console.log(err.response);
//           });
//       }
//     }
           
//     }
//     const handleCards = () => {
//        {  console.log("Handling cards", cards)
//           const items = cards.map((item, i) => {
//             let thumbnail = '';
//             if (item.volumeInfo.imageLinks) {
//               thumbnail = item.volumeInfo.imageLinks.thumbnail;
//             }
    
//             return (
//               <div className='col-lg-4 mb-3' key={item.id}>
//                 <BookCard
//                   thumbnail={thumbnail}
//                   title={item.volumeInfo.title}
//                   pageCount={item.volumeInfo.pageCount}
//                   language={item.volumeInfo.language}
//                   authors={item.volumeInfo.authors}
//                   publisher={item.volumeInfo.publisher}
//                   description={item.volumeInfo.description}
//                   previewLink={item.volumeInfo.previewLink}
//                   infoLink={item.volumeInfo.infoLink}
                  
//                 />
//               </div>
//             );
//           });
//           return (
//             <div className='container my-5'>
//               <div className='row'>{items}</div>
//             </div>
//           );
//         }
//       };

//       return (
//         <div className='w-100 h-100'>
        
//           {mainFunc()}
//           {handleCards()}
          
//           <ToastContainer />
         
//         </div>
         
//       );
//       }
//     }
    const mapStateToProps=function(state) {
      return{
        books:state.movies.books,
        predicted_book:state.movies.predicted_book
      }  
    } 
      
    
    export default connect(mapStateToProps,{emptyBooks})(PredictedBooks);
