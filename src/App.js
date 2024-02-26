// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </>
  );
};

export default App;
