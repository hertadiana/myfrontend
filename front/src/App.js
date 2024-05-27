import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddBook from './components/AddBook/AddBook.jsx';
import AddReview from './components/AddReview/AddReview.jsx';
import BookDetails from './components/BookDetails/BookDetails.jsx';
import EditBook from './components/EditBook/EditBook.jsx';
import EditReview from './components/EditReview/EditReview.jsx';
import Home from './components/Home/Home';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import { fetchData } from './context/BooksContext.js';

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

function App() {
  

  const [books, setBooks] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const BooksContext = createContext();

  const checkServerStatus = async () => {
    try {
      const response = await axios.get('https://16.171.2.241:3000/status');

      if (response.status === 200) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsOnline(false);
    }
  };

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    checkServerStatus();

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    const fetchDataAsync = async () => {
      const fetchedData = await fetchData();
      setBooks(fetchedData);
    };

    
    // fetchDataAsync();
  }, []);

  const useBooks = () => useContext(BooksContext);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };


  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {
        !isOnline
        ? (<div className="online-status">Servers are down or you have no internet connection</div>)
        : ''
      }
      <div className="App">
       <ThemeProvider theme={theme}>
       <CssBaseline />
        <Router>
        <h1>Library Application</h1>
              <div style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={logout}>Log out</div>
              <br />
              <Routes>
                  
                  <Route exact path="/" element={<Home theme={theme} books={books} setBooks={setBooks} />}>
                  </Route>

                  <Route exact path="/register" element={<Register/>}>
                  </Route>

                  <Route exact path="/login" element={<Login/>}>
                  </Route>

                  <Route path="/book/add" element={<AddBook theme={theme} books={books} setBooks={setBooks} />}>
                  </Route>

                  <Route path="/book/details/:id" element={<BookDetails theme={theme} books={books} />}>
                  </Route>

                  <Route path="/book/edit/:id" element={<EditBook theme={theme} books={books} setBooks={setBooks} />}>
                  </Route>

                  <Route path="/book/details/:id/review/add" element={<AddReview theme={theme} />}>
                  </Route>

                  <Route path="/review/edit/:bookId/:reviewId" element={<EditReview theme={theme} />}>
                  </Route>

              </Routes>
          </Router> 
        </ThemeProvider>
    </div>
    </BooksContext.Provider>
  );
}

export default App;
