// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import useRegister from '../hooks/useRegister';

const Registration = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {register, isLoading, error} = useRegister()
  const navigate = useNavigate();

  const handleLoginClick = ()=>{
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    await register(name, email, password);
    
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
        <h2>Register</h2>
        <form className='form' onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={name}
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="email"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <br />

          <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
          {error && <div>{error}</div>}

          <p className='register-link'>Have no account yet?</p>
          <button className="register-btn" onClick={handleLoginClick}>Login</button>
        </form>
        
      </div>

    </div>
    
  );
};

export default Registration;
