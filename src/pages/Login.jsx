// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistrationClick = ()=>{
    navigate('/register')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {error && <div>{error}</div>}
          <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className='register-link'>Have no account yet?</p>
          <button className="register-btn" onClick={handleRegistrationClick}>Register</button>
        </form>
        
      </div>
    </div>
      
  );
};

export default Login;
