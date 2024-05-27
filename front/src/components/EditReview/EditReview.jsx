import React, { useEffect, useState } from 'react';
// import './EditBook.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditReview = props => {
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');
    const { bookId, reviewId } = useParams();

    useEffect(() => {

        
      }, []);

      
  
      const editReview = async () => {
        try {
            const json = {
                rating,
                text
            };
            await axios.put(`http://16.171.2.241:3000/reviews/${bookId}/${reviewId}`, json);
          } catch (error) {
            console.error('Error updating element:', error);
          }
      }
  
      const handleSubmit = (e) => {
          e.preventDefault();

          editReview();

          
      };
    

    return (
        <div className='BookDetails'>
            <Box className="edit-form" component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': {  width: '25ch' } }}>
                <TextField
                    required
                    id="rating"
                    label="Rating"
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <TextField
                    required
                    id="text"
                    label="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{marginLeft: '2em'}}
                />
                
                <Button className='submit-button' type="submit" variant="contained" color="primary">Edit Book</Button>
            </Box>

            {/* <BookDetails theme={props.theme} books={props.books} id={id} /> */}
        </div>
    );
};

export default EditReview;