import React, { useState } from 'react';
import { render, fireEvent, queryByAttribute } from '@testing-library/react';
import Book from '../models/Book';
import EditBook from '../components/EditBook/EditBook';
import BookDetails from '../components/BookDetails/BookDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#673ab7', // deepPurple color
      },
      secondary: {
        main: '#9c27b0' // purple color
      }
    },
  });

describe('BookDetails component', () => {
  it('Should display details for an item from the list of books', () => {
    let bookEntities = [
        new Book(1, 'A Game of Thrones', 'George R. R. Martin', 1996),
        new Book(2, 'Caraval', 'Stephanie Garber', 2016),
        new Book(3, '1984', 'George Orwell', 1949),
        new Book(4, 'Carrie', 'Stephen King', 1974),
        new Book(5, 'The Hunger Games', 'Suzanne Collins', 2008),
        new Book(6, 'Kokoro', 'Natsume Sōseki', 1914)
      ];

    const initialLength = bookEntities.length;

    // const [books, setBooks] = useState(bookEntities);
    let books = bookEntities;

    const setBooks = booksToSet => {
        books = [...booksToSet];
    }

    const dom = render(<BookDetails theme={theme} books={books} setBooks={setBooks} id={1} />);
    const getByText = dom.getByText; 

    expect(getByText('A Game of Thrones')).toBeInTheDocument();
    expect(getByText('George R. R. Martin')).toBeInTheDocument();
    expect(getByText('1996')).toBeInTheDocument();
    // const getByTextHome = render(<Home theme={theme} books={books} />).getByText;

    // expect(getByTextHome('The Enemy')).toBeInTheDocument();
    // expect(getByTextHome('Lee Child')).toBeInTheDocument();
    // expect(getByTextHome('2004')).toBeInTheDocument();
  });
});