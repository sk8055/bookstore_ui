import React, { useEffect } from 'react';
import axios from 'axios';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post('http://127.0.0.1:8000/api/logout', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        localStorage.removeItem('accessToken');
        onLogout();
      } catch (err) {
        console.error('Error logging out:', err);
      } finally {
        window.location.href = '/login';
      }
    };

    handleLogout();
  }, [onLogout]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;


