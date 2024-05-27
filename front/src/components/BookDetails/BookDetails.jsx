import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Book from '../../models/Book';
import './BookDetails.css';


const BookDetails = props => {
    let { id } = useParams();
    const [userId, setUserId] = useState('');
    const [book, setBook] = useState(new Book('1', '2', '3', '4', []));


    const fetchBook = async () => {
        setUserId(localStorage.getItem('id'));
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:5001/books/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            
            setBook(new Book(response.data.id, response.data.title, response.data.author, response.data.releaseYear, response.data.reviews));
            
            // setHomeBooks(bookEntities);
          } catch (error) {
            console.error('Error fetching data:', error);
      
          }
    };

    useEffect(() => {
        if (props.id) {
            id = props.id;
        }

        fetchBook();

        // for (const currentBook of props.books) {
            // if (currentBook.getId() == id) {
        //         setBook(currentBook);
                
        //         return;
        //     }
        // }

        
      }, []);
    
      const handleReviewDelete = async (reviewId) => {
        if (reviewId !== -1) {
            try {
                const token = localStorage.getItem('token');

                await axios.delete(`http://localhost:5001/reviews/${book.getId()}/${reviewId}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                
              } catch (error) {
                console.error('Error deleting element:', error);
              }

            window.location.reload();
        }
      };

    return (
        <div className='BookDetails'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: props.theme.palette.primary.main}}>
                            <TableCell align="center" style={{color: 'white', fontWeight: 'bold'}}>Title</TableCell>
                            <TableCell align="center" style={{color: 'white', fontWeight: 'bold'}}>Author</TableCell>
                            <TableCell align="center" style={{color: 'white', fontWeight: 'bold'}}>Release Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        key={book.getId()}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{ 
                            backgroundColor: props.theme.palette.secondary.main
        
                        }}
                        >
                            <TableCell component="th" scope="row" align='center' style={{color: 'white'}}>
                                {book.getTitle()}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center' style={{color: 'white'}}>
                                {book.getAuthor()}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center' style={{color: 'white'}}>
                                {book.getReleaseYear()}
                            </TableCell>
                    
                        </TableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>

            <h1>Reviews</h1>
            <Link to='review/add'>
                    <Button className="add-button">
                        Add Review
                    </Button>
                </Link>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: props.theme.palette.primary.main}}>
                            {/* <TableCell align="center" style={{color: 'white', fontWeight: 'bold'}}>Reviewer</TableCell> */}
                            <TableCell align="center" style={{color: 'white', fontWeight: 'bold'}}>Rating</TableCell>
                            <TableCell align="center" style={{color: 'white', fontWeight: 'bold'}}>Text</TableCell>
                            <TableCell align="center" style={{color: 'white', fontWeight: 'bold'}}>Date</TableCell>
                            <TableCell align="center" style={{color: 'white', fontWeight: 'bold'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {book.reviews.map((review, index) => (
                        <TableRow
                        key={review.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{
                            backgroundColor: index % 2 === 0 ? props.theme.palette.secondary.main  : props.theme.palette.primary.main,
                            }}
                        >
                            {/* <TableCell component="th" scope="row" align='center' style={{color: 'white'}}>
                                {review.reviewer}
                            </TableCell> */}
                            <TableCell component="th" scope="row" align='center' style={{color: 'white'}}>
                                {review.rating}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center' style={{color: 'white'}}>
                                {review.text}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center' style={{color: 'white'}}>
                                {review.date}
                            </TableCell>
                            {review.reviewer === userId ?
                            (<TableCell component="th" scope="row" align='center' style={{ color: 'white' }}>
                                <Button className={index % 2 === 0 ? 'opposite-color-button' : ''} onClick={() => handleReviewDelete(review.id)}>
                                    Delete
                                </Button>
                                <Link to={`/review/edit/${book.getId()}/${review.id}`}>
                                    <Button className={index % 2 === 0 ? 'opposite-color-button' : ''} style={{ marginLeft: '2em' }}>
                                    Edit
                                    </Button>
                                </Link>
                                </TableCell>) : ''}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BookDetails;