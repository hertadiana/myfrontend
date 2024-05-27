import React, { useState } from 'react';
import { render, fireEvent, queryByAttribute } from '@testing-library/react';
import Book from '../models/Book';
import AddBook from '../components/AddBook/AddBook';
import Home from '../components/Home/Home';
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

describe('AddBook component', () => {
  it('Should add an item to the list of books', () => {
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
    const books = bookEntities;

    const dom = render(<AddBook theme={theme} books={books} />);
    const getByText = dom.getByText;

    const getById = queryByAttribute.bind(null, 'id');

    const titleTextField = getById(dom.container, 'title');
    const authorTextField = getById(dom.container, 'author');
    const releaseYearTextField = getById(dom.container, 'releaseYear');

    fireEvent.change(titleTextField, { target: { value: 'The Enemy' } });
    fireEvent.change(authorTextField, { target: { value: 'Lee Child' } });
    fireEvent.change(releaseYearTextField, { target: { value: '2004' } });

    expect(getByText('Add Book')).toBeInTheDocument();
    fireEvent.click(getByText('Add Book'));

    expect(bookEntities.length).toEqual(initialLength + 1);

    // const getByTextHome = render(<Home theme={theme} books={books} />).getByText;

    // expect(getByTextHome('The Enemy')).toBeInTheDocument();
    // expect(getByTextHome('Lee Child')).toBeInTheDocument();
    // expect(getByTextHome('2004')).toBeInTheDocument();
  });
});