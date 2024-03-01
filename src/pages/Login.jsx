// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistrationClick = ()=>{
    navigate('/register')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='login-container'>
      <div className='left-section'>
        <div className='logo'>
          <img src="/images/center-logo.png" alt="Logo" id="center-logo" />
          <img src="/images/logo-background.png" alt="Logo" id="logo-background" />
        </div>
        <h1 className="heading">Welcome aboard my friend</h1>
        <h2 className="sub-heading">just a couple of clicks and we start</h2>
      </div>
      <div className='right-section'>
        <h2>Login</h2>
        <form className='form' onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
          <p className='register-link'>Have no account yet?</p>
          <button className="register-btn" onClick={handleRegistrationClick}>Register</button>
        </form>
        
      </div>
    </div>
      
  );
};

export default Login;
