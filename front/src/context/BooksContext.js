import axios from 'axios';
import { createContext, useContext } from 'react';
import Book from './../models/Book';

export const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const fetchData = async () => {
    let bookEntities = [];
    try {
      const response = await axios.get('http://localhost:5001/books');

      for (const book of response.data) {
        bookEntities.push(new Book(book.id, book.title, book.author, book.releaseYear));
        
      }
      
      return bookEntities;
    } catch (error) {
      console.error('Error fetching data:', error);

      return [];
    }
};
