import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register', { name, email, password });
      const { token } = res.data;
      localStorage.setItem('accessToken', token);
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className='d-flex bg-primary align-items-center justify-content-center vh-100'>
      <div className='p-3 rounded bg-white'>
        <form onSubmit={e => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              required
              autoComplete="off"
              className='form-control rounded-0 border border-dark'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
              autoComplete="off"
              className='form-control rounded-0 border border-dark'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              required
              autoComplete="off"
              className='form-control rounded-0 border border-dark'
            />
          </div>
          <input type="submit" value="Register" className='w-100 btn btn-success rounded-0' />
        </form>
        {error && <p className="text-danger">{error}</p>}
        <p>Already have an account? <Link to="/login" className='w-100 btn btn-default border border-dark rounded-0'>Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
