import React from 'react';
import './TaskManager.css';

const TaskManager = () => {
  return (
    <div className="task-manager">
      <div className="sidebar">
        <h2>All Tasks</h2>
        <ul className="categories">
          <li className="active">All Tasks</li>
          <li>Favourites</li>
          <li>Groceries</li>
          <li>Work</li>
          <li>Study</li>
          <li>Sports</li>
          <li className="new-category">+ New category</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>All Tasks</h1>
        <input type="text" className="new-task-input" placeholder="Add a new task" />
        <ul className="task-list">
          <li className="task-item completed">
            <span className="checkbox completed"></span>
            <span className="task-text completed">Buy Bananas for the pancakes</span>
            <span className="tag groceries">Groceries</span>
          </li>
          <li className="task-item completed">
            <span className="checkbox completed"></span>
            <span className="task-text completed">Go to the Gym</span>
            <span className="tag sports">Sports</span>
          </li>
          <li className="task-item">
            <span className="checkbox"></span>
            <span className="task-text">Prepare roadmap for MVP</span>
            <span className="tag work">Work</span>
          </li>
          <li className="task-item">
            <span className="checkbox"></span>
            <span className="task-text">Read chapter 3 from Math book</span>
            <span className="tag study">Study</span>
          </li>
          <li className="task-item">
            <span className="checkbox"></span>
            <span className="task-text">Call Peter</span>
            <span className="tag work">Work</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TaskManager;