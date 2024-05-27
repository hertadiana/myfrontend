import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Book from '../../models/Book';
import './AddBook.css';

const AddBook = props => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const navigate = useNavigate();

    const addBook = async () => {
        let maxId = -1;

        for (const currentBook of props.books) {
            if (currentBook.getId() > maxId) {
                maxId = currentBook.getId()
            }
        }

        const bookToAdd = new Book(maxId + 1, title, author, releaseYear);

        props.books.push(bookToAdd);

        try {
            const token = localStorage.getItem('token');
            
            await axios.post(`https://16.171.2.241:3000/books`, bookToAdd, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
          } catch (error) {
            console.error('Error:', error);
          }
          
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addBook();
    };

    return (
        <div className='AddBook'>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': {  width: '25ch' } }}>
                <TextField
                    required
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    required
                    id="author"
                    label="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    style={{marginLeft: '2em'}}
                />
                <TextField
                    required
                    id="releaseYear"
                    label="Release Year"
                    type="number"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    style={{marginLeft: '2em'}}
                />
                
                <Button className='submit-button' type="submit" variant="contained" color="primary">Add Book</Button>
            </Box>
        </div>
    );
}

export default AddBook;