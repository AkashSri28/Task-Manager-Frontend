import React from 'react'
import { NavLink } from 'react-router-dom'

function DashboardNav() {
  return (
    <div className="left-section">
        <img src="path-to-your-logo" alt="Logo" className="logo" />
        <nav>
        <ul>
            <li><NavLink to="/">Board</NavLink></li>
            <li><NavLink to="/analytics">Analytics</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
        </ul>
        </nav>
        <button className="logout-btn">Logout</button>
  </div>
  )
}

export default DashboardNav