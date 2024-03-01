import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

function DashboardNav() {
  return (
      <div className="dashboard-nav">
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
  )
}

export default DashboardNav