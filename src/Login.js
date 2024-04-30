import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/login`, { email, password });
      const { token } = res.data;
      localStorage.setItem('accessToken', token);
      onLogin();
      navigate('/booklist');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
        <div className='d-flex bg-primary align-items-center justify-content-center vh-100'>
            <div className='p-3 rounded bg-white w-25'>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlfor='email'><strong>email</strong></label>
                            <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required className='form-control rounded-0 border border-dark' />
                    </div>
                    <div className='mb-3'>
                        <label htmlfor='password'><strong>Password</strong></label>
                            <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required className='form-control rounded-0 border border-dark' />
                    </div>
                    <input type="submit" value="Login" className='w-100 btn btn-success rounded-0' />
                </form>
                {error && <p className="text-danger">{error}</p>}
                <p>Don't have an account? <Link to="/register" className='w-100 btn btn-default border border-dark rounded-0'>Sign Up</Link></p>
            </div>
        </div>
  );
};

export default Login;

