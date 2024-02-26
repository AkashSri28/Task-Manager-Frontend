import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/Board.css';
import TestComponent from './TestComponent';
import Modal2 from './Modal2';

function Board() {
    const user = 'John Doe'; // Replace with the actual user's name

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const [showModal, setShowModal] = useState(false);

    const handleAddTask = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

  return (
    <div className="right-section">
        <div className="top-section">
          <div className="user-greeting">Hello {user}</div>
          <div className="date">{formatDate(new Date())}</div>
        </div>
        <div className="bottom-section">
            <div className="top-bottom-section">
                <div className="board-heading">Board</div>
                <div className="filter-menu">
                    <select>
                    <option value="today">Today</option>
                    <option value="this-week">This week</option>
                    <option value="this-month">This month</option>
                    </select>
                </div>
            </div>
            <div className="bottom-bottom-section">
                <div className="column">
                    <h3>Backlog</h3>
                    {/* Your Backlog content goes here */}
                </div>
                <div className="column">
                    <h3>To-do</h3>
                    <button onClick={handleAddTask}>Add Task</button>
                    {showModal && <Modal/>}
                </div>
                <div className="column">
                    <h3>In Progress</h3>
                    {/* Your In Progress content goes here */}
                </div>
                <div className="column">
                    <h3>Done</h3>
                    {/* Your Done content goes here */}
                </div>
            </div>

        </div>
      </div>
  )
}

export default Board