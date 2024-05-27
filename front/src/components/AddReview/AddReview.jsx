import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddReview = props => {
    const [reviewer, setReviewer] = useState('');
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();


    const addReview = async () => {
        try {
            const postData = {
                reviewer,
                rating,
                text
            };
            await axios.post(`http://16.171.2.241:3000/reviews/${id}`, postData);
          } catch (error) {
            console.error('Error:', error);
          }

          
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addReview();
    };

    return (
        <div className='AddBook'>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': {  width: '25ch' } }}>
                <TextField
                    required
                    id="reviewer"
                    label="Reviewer"
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}
                />
                <TextField
                    required
                    id="rating"
                    label="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    style={{marginLeft: '2em'}}
                />
                <TextField
                    required
                    id="text"
                    label="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{marginLeft: '2em'}}
                />
                
                <Button className='submit-button' type="submit" variant="contained" color="primary">Add Review</Button>
            </Box>
        </div>
    );
}

export default AddReview;