// App.js
import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import DashboardNav from './components/DashboardNav';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {

  const {user} = useAuthContext();
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='pages'>
            <Routes>
              <Route path="/login" element={ !user ? <Login/>: <Navigate  to="/" />} />
              <Route path="/register" element={ !user ? <Registration/>: <Navigate to="/" />} />
              <Route path="/" element={ user ? <Dashboard/> : <Navigate to="/login" /> } />
              <Route path="/analytics" element={ user ?<Analytics/>: <Navigate to="/login" />} />
              <Route path="/settings" element={ user ? <Settings/>: <Navigate to="/login" />} />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
