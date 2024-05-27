import React, { useEffect, useState } from 'react';
// import './Home.css';
import { Button, TablePagination } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { Link } from "react-router-dom";
import Book from '../../models/Book';

const Home = props => {
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [bookIdToDelete, setBookIdToDelete] = useState(-1);
    const [homeBooks, setHomeBooks] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const fetchData = async () => {
        let bookEntities = [];
                
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('https://16.171.2.241:3000/books', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
    
          for (const book of response.data) {
            bookEntities.push(new Book(book.id, book.title, book.author, book.releaseYear));
            
          }
          
          setHomeBooks(bookEntities);
        } catch (error) {
          console.error('Error fetching data:', error);
    
        }
    };

    useEffect(() => {
            fetchData();

            const socket = new WebSocket('ws://localhost:5001');

            socket.onopen = () => {
                console.log('WebSocket connected');
            };

            socket.onmessage = (event) => {
                const update = JSON.parse(event.data);
                if (update.type === 'new_book') {
                    setHomeBooks(prevBooks => [...prevBooks, new Book(update.data.id, update.data.title, update.data.author, update.data.releaseYear)]);
                    // console.log(update.data);
                    // console.log(homeBooks);
                }
            };

            setHomeBooks(homeBooks.sort((a, b) => {
                const titleA = a.getTitle().toLowerCase();
                const titleB = b.getTitle().toLowerCase();
              
                if (titleA > titleB) return -1;
                if (titleA < titleB) return 1;
            
                return 0;
              }));

              return () => {
                socket.close();
            };
          }, []);

    const handleDelete = 
    bookId => {
        setOpenDeleteConfirmation(true);

        setBookIdToDelete(bookId);

        
    };

    const handleDeleteConfirm = async () => {
        if (bookIdToDelete !== -1) {
            try {
                const token = localStorage.getItem('token');

                await axios.delete(`https://16.171.2.241:3000/books/${bookIdToDelete}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
              } catch (error) {
                console.error('Error deleting element:', error);
              }

            const newBooks = homeBooks.filter(book => book.getId() !== bookIdToDelete)
            props.setBooks(newBooks);
            setHomeBooks(newBooks.sort((a, b) => {
                const titleA = a.getTitle().toLowerCase();
                const titleB = b.getTitle().toLowerCase();
              
                if (titleA > titleB) return -1;
                if (titleA < titleB) return 1;
            
                return 0;
              }));
        }

        setOpenDeleteConfirmation(false);
    };

    const handleDeleteCancel = () => {
        setOpenDeleteConfirmation(false);
    };

    return (
            <div className='Home'>
                <Link to='book/add'>
                    <Button className="add-button">
                        Add Book
                    </Button>
                </Link>
                <div className="container">
                    <div className="left">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{backgroundColor: props.theme.palette.primary.main}}>
                            <TableCell align="center" style={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell align="center" style={{ color: 'white', fontWeight: 'bold' }}>Author</TableCell>
                            <TableCell align="center" style={{ color: 'white', fontWeight: 'bold' }}>Release Year</TableCell>
                            <TableCell align="center" style={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                            ? homeBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : homeBooks
                            ).map((book, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{
                                backgroundColor: index % 2 === 0 ? props.theme.palette.secondary.main  : props.theme.palette.primary.main,
                                }}
                            >
                                <TableCell component="th" scope="row" align='center' style={{ color: 'white' }}>
                                {book.getTitle()}
                                </TableCell>
                                <TableCell component="th" scope="row" align='center' style={{ color: 'white' }}>
                                {book.getAuthor()}
                                </TableCell>
                                <TableCell component="th" scope="row" align='center' style={{ color: 'white' }}>
                                {book.getReleaseYear()}
                                </TableCell>
                                <TableCell component="th" scope="row" align='center' style={{ color: 'white' }}>
                                <Button className={index % 2 === 0 ? 'opposite-color-button' : ''} onClick={() => handleDelete(book.getId())}>
                                    Delete
                                </Button>
                                <Link to={`book/edit/${book.getId()}`}>
                                    <Button className={index % 2 === 0 ? 'opposite-color-button' : ''} style={{ marginLeft: '2em' }}>
                                    Edit
                                    </Button>
                                </Link>
                                <Link to={`book/details/${book.getId()}`}>
                                    <Button className={index % 2 === 0 ? 'opposite-color-button' : ''} style={{ marginLeft: '2em' }}>
                                    View
                                    </Button>
                                </Link>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={homeBooks.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                        <Dialog open={openDeleteConfirmation} onClose={handleDeleteCancel}>
                            <DialogTitle>Confirm</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this book?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
                            <Button onClick={handleDeleteConfirm} color="primary" autoFocus>Confirm</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div className="right">
                        <PieChart
                            series={[
                                {
                                data: Object.values(
                                    homeBooks.reduce((accumulator, book) => {
                                    const { author } = book;
                                    accumulator[author] = accumulator[author] ? { ...accumulator[author], numberOfBooks: accumulator[author].numberOfBooks + 1 } : { id: author, author, numberOfBooks: 1 };
                                    return accumulator;
                                    }, {})
                                )
                                .map((author, index) => ({ 'id': index, 'value': author.numberOfBooks, 'label': author.author })),
        
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 360,
                                
                                // cx: 150,
                                // cy: 150,
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </div>
                </div>
            </div>
    );
}

export default Home;