// App.js
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import DashboardNav from './components/DashboardNav';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='pages'>
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Registration/>} />
              <Route path="/" element={<Dashboard/>} />
              <Route path="/analytics" element={<Analytics/>} />
              <Route path="/settings" element={<Settings/>} />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
