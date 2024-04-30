import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import BookList from './BookList';
import Orders from './Orders';
import Logout from './Logout';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            {isLoggedIn ? (
              <>
                <Route path="/booklist" element={<BookList />} />
                <Route path="/orders" element={<Orders />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;







/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import BookList from './BookList';
import Orders from './Orders';
import Logout from './Logout';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [key, setKey] = useState(0);

  const handleLogin = () => {
    // Update the key to force re-render of Header component after login
    setKey(prevKey => prevKey + 1);
  };

  return (
    <Router>
      <div>
        <Header key={key} />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/booklist" element={<BookList />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
*/
