import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import '../styles/Board.css';
import '../styles/card.css';
import TestComponent from './TestComponent';
import axios from 'axios';

function Board() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/cards');
            setCards(response.data);
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
                               <span className={`priority-dot ${card.priority.toLowerCase()}`}></span>
                                {card.priority}
                                <div className="card-actions">
                                <button>Edit</button>
                                <button>Share</button>
                                <button>Delete</button>
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
                                <span onClick={() => moveCard(card._id, 'In Progress')}>In Progress</span>
                                <span onClick={() => moveCard(card._id, 'Done')}>Done</span>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </div>
                <div className="column">
                    <h3>To-do</h3>
                    <button onClick={handleAddTask}>Add Task</button>
                    {showModal && <Modal/>}
                    <div className='cards-container'>
                    {
                        cards
                        .filter(card => card.column === 'To-do')
                        .map((card) => (
                            <div key={card.id} className="card">
                               <span className={`priority-dot ${card.priority.toLowerCase()}`}></span>
                                {card.priority}
                                <div className="card-actions">
                                <button>Edit</button>
                                <button>Share</button>
                                <button>Delete</button>
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
                                <span onClick={() => moveCard(card._id, 'In Progress')}>In Progress</span>
                                <span onClick={() => moveCard(card._id, 'Done')}>Done</span>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                    
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