import React, { useEffect, useState } from 'react';
// import './EditBook.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Book from '../../models/Book';
import BookDetails from '../BookDetails/BookDetails';

const EditBook = props => {
    let { id } = useParams();
    const [book, setBook] = useState(new Book());
    const [title, setTitle] = useState(book.getTitle());
    const [author, setAuthor] = useState(book.getAuthor());
    const [releaseYear, setReleaseYear] = useState(book.getReleaseYear());

    useEffect(() => {
        if (props.id) {
            id = props.id;
        }
        
        for (const currentBook of props.books) {
            if (currentBook.getId() == id) {
                setBook(currentBook);
                setTitle(currentBook.getTitle());
                setAuthor(currentBook.getAuthor());
                setReleaseYear(currentBook.getReleaseYear());

                return;
            }
        }
        
      }, []);

      
  
      const editBook = async () => {
        props.setBooks(props.books.map(currentBook => {
            if (currentBook.getId() === book.getId()) {
                currentBook.setTitle(title);
                currentBook.setAuthor(author);
                currentBook.setReleaseYear(releaseYear);
            }
            
            return currentBook;
        }));
        try {
            const json = {
                id: book.getId(),
                title: book.getTitle(),
                author: book.getAuthor(),
                releaseYear: book.getReleaseYear()

            };
            await axios.put(`http://16.171.2.241:3000/books/${book.getId()}`, json);
          } catch (error) {
            console.error('Error updating element:', error);
          }
      }
  
      const handleSubmit = (e) => {
          e.preventDefault();

          editBook();

          
      };
    

    return (
        <div className='BookDetails'>
            <Box className="edit-form" component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': {  width: '25ch' } }}>
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
                
                <Button className='submit-button' type="submit" variant="contained" color="primary">Edit Book</Button>
            </Box>

            <BookDetails theme={props.theme} books={props.books} id={id} />
        </div>
    );
};

export default EditBook;