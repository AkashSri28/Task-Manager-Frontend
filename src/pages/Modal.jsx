import React, { useState } from 'react';
import '../styles/Modal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import { useCardsContext } from '../hooks/useCardsContext';

function Modal({handleCloseModal}) {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('')

  const {dispatch} = useCardsContext();

  const addNewTask = () => {
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks([...tasks, { id: newId, title: '', completed: false }]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const totalTasksCount = tasks.length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === '' || priority.trim() === '' || tasks.length < 1) {
      alert('Please fill in all mandatory fields');
      return;
    }

    // Send data to backend
    try {
        const response = await axios.post('http://localhost:5000/api/cards', {
          title,
          priority,
          tasks,
          dueDate
        });
  
        console.log('Response from backend:', response.data);
  
        // Clear form fields
        setTitle('');
        setPriority('');
        setTasks([]);
        dueDate('')

        //update global state
        dispatch({type: 'CREATE_CARD', payload: response.data})
      } catch (error) {
        console.error('Error sending data to backend:', error);
      }

      handleCloseModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <label>Title:</label>
          <input 
          type="text" 
          placeholder="Enter Task Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Select Priority:</label>
          <div>
            <button onClick={() => setPriority('high')}>High Priority</button>
            <button onClick={() => setPriority('medium')}>Moderate Priority</button>
            <button onClick={() => setPriority('low')}>Low Priority</button>
          </div>
        </div>
        <div>
          <label>Checklist </label>
          <span>
              {completedTasksCount}/{totalTasksCount}
          </span>

          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, title: e.target.value } : t
                      )
                    )
                  }
                />
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <button onClick={addNewTask}>Add New</button>
        </div>
        
        <div>
        <label>Select Due Date:</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
          />
          <button onClick={handleCloseModal}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
