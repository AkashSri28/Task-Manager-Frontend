import React, { useState } from 'react';
import '../styles/Modal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function Modal() {
  const [tasks, setTasks] = useState([
  ]);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState()

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || priority.trim() === '' || tasks.length < 1) {
      alert('Please fill in all mandatory fields');
      return;
    }

    // Send data to backend
    console.log('Title:', title);
    console.log('Priority:', priority);
    console.log('Checklist:', tasks);

    // Clear form fields
    setTitle('');
    setPriority('');
    setTasks([]);
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
            <button onClick={() => setPriority('High')}>High Priority</button>
            <button onClick={() => setPriority('Moderate')}>Moderate Priority</button>
            <button onClick={() => setPriority('Low')}>Low Priority</button>
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
          <button>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
