// import React, { useState } from 'react';
// import { render, fireEvent, queryByAttribute } from '@testing-library/react';
// import Book from '../models/Book';
// import EditBook from '../components/EditBook/EditBook';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#673ab7', // deepPurple color
//       },
//       secondary: {
//         main: '#9c27b0' // purple color
//       }
//     },
//   });

// describe('EditBook component', () => {
//   it('Should edit an item from the list of books', () => {
//     let bookEntities = [
//         new Book(1, 'A Game of Thrones', 'George R. R. Martin', 1996),
//         new Book(2, 'Caraval', 'Stephanie Garber', 2016),
//         new Book(3, '1984', 'George Orwell', 1949),
//         new Book(4, 'Carrie', 'Stephen King', 1974),
//         new Book(5, 'The Hunger Games', 'Suzanne Collins', 2008),
//         new Book(6, 'Kokoro', 'Natsume Sōseki', 1914)
//       ];

//     const initialLength = bookEntities.length;

//     // const [books, setBooks] = useState(bookEntities);
//     let books = bookEntities;

//     const setBooks = booksToSet => {
//         books = [...booksToSet];
//     }

//     const dom = render(<EditBook theme={theme} books={books} setBooks={setBooks} id={1} />);
//     const getByText = dom.getByText; 

//     const getById = queryByAttribute.bind(null, 'id');

//     const titleTextField = getById(dom.container, 'title');
//     const authorTextField = getById(dom.container, 'author');
//     const releaseYearTextField = getById(dom.container, 'releaseYear');

//     fireEvent.change(titleTextField, { target: { value: 'ABC' } });
//     fireEvent.change(authorTextField, { target: { value: 'DEF' } });
//     fireEvent.change(releaseYearTextField, { target: { value: 123 } });

//     expect(getByText('Edit Book')).toBeInTheDocument();
//     fireEvent.click(getByText('Edit Book'));

//     expect(bookEntities[0].getTitle()).toEqual('ABC');
//     expect(bookEntities[0].getAuthor()).toEqual('DEF');
//     expect(bookEntities[0].getReleaseYear().toString()).toEqual("123");

//     // const getByTextHome = render(<Home theme={theme} books={books} />).getByText;

//     // expect(getByTextHome('The Enemy')).toBeInTheDocument();
//     // expect(getByTextHome('Lee Child')).toBeInTheDocument();
//     // expect(getByTextHome('2004')).toBeInTheDocument();
//   });
// });