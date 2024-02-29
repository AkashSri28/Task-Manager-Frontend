import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function DashboardNav() {
  return (
    <header>
      <div className="container">
        <img src="path-to-your-logo" alt="Logo" className="logo" />
        <Link to="/">Board</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/settings">Settings</Link>
        
        {/* <nav>
        <ul>
            <li><NavLink to="/">Board</NavLink></li>
            <li><NavLink to="/analytics">Analytics</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
        </ul>
        </nav> */}
        <button className="logout-btn">Logout</button>
      </div>
    </header>
  )
}

export default DashboardNav