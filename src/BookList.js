import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import './booklist.css';


const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      console.log('Offset before API call:', offset);
      const res = await axios.get(`http://localhost:8000/api/books?limit=5&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newBooks = res.data.books;
      if (newBooks.length === 0) {
        setHasMore(false);
      } else {
        if (offset === 0) {
          setBooks(newBooks.map(book => ({ ...book, selected: false })));
        } else {
          setBooks(prevBooks => [...prevBooks, ...newBooks.map(book => ({ ...book, selected: false }))]);
        }
        setOffset(offset + newBooks.length);
      }
    //   console.log('Offset after API call:', offset);
    } catch (err) {
    //   console.error(err);
    }
  }; 
  

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSelect = id => {
    const updatedBooks = books.map(book => {
      if (book.id === id) {
        return { ...book, selected: true };
      }
      return book;
    });
    setSelectedBooks([...selectedBooks, id]);
    setBooks(updatedBooks);
  };

  const handleCancel = id => {
    const updatedBooks = books.map(book => {
      if (book.id === id) {
        return { ...book, selected: false };
      }
      return book;
    });
    setSelectedBooks(selectedBooks.filter(bookId => bookId !== id));
    setBooks(updatedBooks);
  };

  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const totalPoints = selectedBooks.reduce((total, bookId) => {
        const book = books.find(book => book.id === bookId);
        return total + parseInt(book.point);
      }, 0);
  
      const booksData = selectedBooks.map(bookId => {
        const book = books.find(book => book.id === bookId);
        return {
          id: book.id,
          quantity: 1,
          subtotal_points: parseInt(book.point)
        };
      });
  
      const requestBody = {
        total_points: totalPoints,
        books: booksData
      };
  
      const res = await axios.post('http://localhost:8000/api/orders/buy', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      //console.log('Order created successfully:', res.data);
      setSelectedBooks([]);
      navigate('/orders');
    } catch (err) {
      
      console.error('Error creating order:', err);
      setAlertMessage(err.response.data.message);
      setTimeout(() => {
        setAlertMessage('');
      }, 5000); 
    }
  };

  return (
    <div className="container">
    <div className="row">
      <div className="col-md-9">
        <h2 className="my-4">Book List</h2>
      </div>
      <div className="col-md-3 text-right mt-4">
      {selectedBooks.length > 0 && (
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
        </div>
      )}
      </div>
      <div className="col-12 text-center">
      {alertMessage && (
        <div className="alert alert-danger" role="alert">
          <h5>
          {alertMessage}
          </h5>
        </div>
      )}                
      </div>
    </div>
      <InfiniteScroll
        dataLength={books.length}
        next={fetchBooks}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>Yay! You have seen it all.</p>}
      >
        <div className="row">
          {books.map(book => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={book.id}>
              <BookCard
                book={book}
                onSelect={handleSelect}
                onCancel={handleCancel}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      
    </div>
  );
};

export default BookList;