import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import '../styles/Board.css';
import '../styles/card.css';
import TestComponent from './TestComponent';
import axios from 'axios';

function Board() {
    const [cards, setCards] = useState([]);

    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        const fetchCards = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/cards');
    
            setCards(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchCards();
      }, [cards]);

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

    const toggleTaskCompletion = (cardId, taskId) => {
        setCards(
          cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  tasks: card.tasks.map((task) =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                  ),
                }
              : card
          )
        );
      };

      const deleteTask = (cardId, taskId) => {
        setCards(
          cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  tasks: card.tasks.filter((task) => task.id !== taskId),
                }
              : card
          )
        );
      };

      const moveCard = (cardId, column) => {
        console.log(cards);
        console.log(cardId.toString());
        setCards(
          cards.map((card) =>
            card._id === cardId.toString()
              ? {
                  ...card,
                  column,
                }
              : card
          )
        );
        console.log(cards);
      };

      const handleActionChange = (cardId, action) => {
        switch (action) {
          case 'edit':
            // Handle edit action
            break;
          case 'share':
            // Handle share action
            break;
          case 'delete':
            // Handle delete action
            break;
          default:
            // Do nothing
            break;
        }
      };

    const completedTasksCounter = (tasks)=>{
        return tasks.filter((task) => task.completed).length;
    }
    const totalTasksCounter = (tasks)=>{
        return tasks.length;
    }

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
                    <div className='cards-container'>
                    {
                        cards
                        .filter(card => card.column === 'Backlog')
                        .map((card) => (
                            <div key={card.id} className="card">
                                <div className='card-priority-top'>
                                    <div>
                                        <span className={`priority-dot ${card.priority.toLowerCase()}`}></span>
                                        {card.priority}
                                    </div>
                                    <div className="card-actions">
                                        <button onClick={handleDropdownToggle}>...</button>
                                        {showDropdown && (
                                            <div className="dropdown-menu">
                                            <button>Edit</button>
                                            <button>Share</button>
                                            <button>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                               
                              <div className="card-title">{card.title}</div>
                              <div className="card-priority">Priority: {card.priority}</div>
                              <div className="card-tasks">
                                <label>Checklist </label>
                                <span>
                                    {completedTasksCounter(card.tasks)}/{totalTasksCounter(totalTasksCounter)}
                                </span>
                                <ul>
                                {card.tasks.map((task) => (
                                    <li key={task.id} className='task'>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(card.id, task.id)}
                                    />
                                    <span>{task.title}</span>
                                    <button onClick={() => deleteTask(card.id, task.id)}>Delete</button>
                                    </li>
                                ))}
                                </ul>
                            </div>
                              
                            {card.dueDate && <div className="card-due-date">Due Date: {card.dueDate}</div>}
                            <div className="card-columns">
                                <span onClick={() => moveCard(card._id, 'To do')}>To do</span>
                                <span onClick={() => moveCard(card._id, 'In progress')}>In progress</span>
                                <span onClick={() => moveCard(card._id, 'Done')}>Done</span>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </div>
                <div className="column">
                    <h3>To do</h3>
                    <button onClick={handleAddTask}>Add Task</button>
                    {showModal && <Modal handleCloseModal={handleCloseModal}/>}
                    <div className='cards-container'>
                    {
                        cards
                        .filter(card => card.column === 'To do')
                        .map((card) => (
                            <div key={card.id} className="card">
                               <div className='card-priority-top'>
                                    <div>
                                        <span className={`priority-dot ${card.priority.toLowerCase()}`}></span>
                                        {card.priority}
                                    </div>
                                    <div className="card-actions">
                                        <button onClick={handleDropdownToggle}>...</button>
                                        {showDropdown && (
                                            <div className="dropdown-menu">
                                            <button>Edit</button>
                                            <button>Share</button>
                                            <button>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                              <div className="card-title">{card.title}</div>
                              <div className="card-priority">Priority: {card.priority}</div>
                              <div className="card-tasks">
                                <label>Checklist </label>
                                <span>
                                    {completedTasksCounter(card.tasks)}/{totalTasksCounter(totalTasksCounter)}
                                </span>
                                <ul>
                                {card.tasks.map((task) => (
                                    <li key={task.id} className='task'>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(card.id, task.id)}
                                    />
                                    <span>{task.title}</span>
                                    <button onClick={() => deleteTask(card.id, task.id)}>Delete</button>
                                    </li>
                                ))}
                                </ul>
                            </div>
                              
                            {card.dueDate && <div className="card-due-date">Due Date: {card.dueDate}</div>}
                            <div className="card-columns">
                                <span onClick={() => moveCard(card._id, 'Backlog')}>Backlog</span>
                                <span onClick={() => moveCard(card._id, 'In progress')}>In progress</span>
                                <span onClick={() => moveCard(card._id, 'Done')}>Done</span>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                    
                </div>
                <div className="column">
                    <h3>In progress</h3>
                    <div className='cards-container'>
                    {
                        cards
                        .filter(card => card.column === 'In progress')
                        .map((card) => (
                            <div key={card.id} className="card">
                               <div className='card-priority-top'>
                                    <div>
                                        <span className={`priority-dot ${card.priority.toLowerCase()}`}></span>
                                        {card.priority}
                                    </div>
                                    <div className="card-actions">
                                        <button onClick={handleDropdownToggle}>...</button>
                                        {showDropdown && (
                                            <div className="dropdown-menu">
                                            <button>Edit</button>
                                            <button>Share</button>
                                            <button>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                              <div className="card-title">{card.title}</div>
                              <div className="card-priority">Priority: {card.priority}</div>
                              <div className="card-tasks">
                                <label>Checklist </label>
                                <span>
                                    {completedTasksCounter(card.tasks)}/{totalTasksCounter(totalTasksCounter)}
                                </span>
                                <ul>
                                {card.tasks.map((task) => (
                                    <li key={task.id} className='task'>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(card.id, task.id)}
                                    />
                                    <span>{task.title}</span>
                                    <button onClick={() => deleteTask(card.id, task.id)}>Delete</button>
                                    </li>
                                ))}
                                </ul>
                            </div>
                              
                            {card.dueDate && <div className="card-due-date">Due Date: {card.dueDate}</div>}
                            <div className="card-columns">
                                <span onClick={() => moveCard(card._id, 'Backlog')}>Backlog</span>
                                <span onClick={() => moveCard(card._id, 'To do')}>To do</span>
                                <span onClick={() => moveCard(card._id, 'Done')}>Done</span>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </div>
                <div className="column">
                    <h3>Done</h3>
                    <div className='cards-container'>
                    {
                        cards && cards
                        .filter(card => card.column === 'Done')
                        .map((card) => (
                            <div key={card.id} className="card">
                               <div className='card-priority-top'>
                                    <div>
                                        <span className={`priority-dot ${card.priority.toLowerCase()}`}></span>
                                        {card.priority}
                                    </div>
                                    <div className="card-actions">
                                        <button onClick={handleDropdownToggle}>...</button>
                                        {showDropdown && (
                                            <div className="dropdown-menu">
                                            <button>Edit</button>
                                            <button>Share</button>
                                            <button>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                              <div className="card-title">{card.title}</div>
                              <div className="card-priority">Priority: {card.priority}</div>
                              <div className="card-tasks">
                                <label>Checklist </label>
                                <span>
                                    {completedTasksCounter(card.tasks)}/{totalTasksCounter(totalTasksCounter)}
                                </span>
                                <ul>
                                {card.tasks && card.tasks.map((task) => (
                                    <li key={task.id} className='task'>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(card.id, task.id)}
                                    />
                                    <span>{task.title}</span>
                                    <button onClick={() => deleteTask(card.id, task.id)}>Delete</button>
                                    </li>
                                ))}
                                </ul>
                            </div>
                              
                            {card.dueDate && <div className="card-due-date">Due Date: {card.dueDate}</div>}
                            <div className="card-columns">
                                <span onClick={() => moveCard(card._id, 'Backlog')}>Backlog</span>
                                <span onClick={() => moveCard(card._id, 'To do')}>To do</span>
                                <span onClick={() => moveCard(card._id, 'In progress')}>In progress</span>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </div>
            </div>

        </div>
      </div>
  )
}

export default Board