import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tasks.css';

const Task = ({ task, onDelete, onUpdate }) => (
    <div className="task-item" onClick={() => onUpdate(task)}>
        <div className='task-content'>
            <h3>{task.taskName}</h3>
            <p>{task.description}</p>
        </div>
        <button
            className="delete-btn"
            onClick={(e) => {
                e.stopPropagation();
                onDelete(task._id);
            }}
        >
            X
        </button>
    </div>
);

const TaskPopup = ({ task, onClose, onUpdate }) => {
    const [taskName, setTaskName] = useState(task.taskName);
    const [description, setDescription] = useState(task.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(task._id, taskName, description);
        onClose();
    };

    return (
        <>
            <div className="blur-background" onClick={onClose}></div>
            <div className="task-popup-overlay">
                <div className="task-popup">
                    <h2>Edit Task</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="Task Name"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        ></textarea>
                        <div className="popup-buttons">
                            <button type="submit">Update</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

const AddTaskPopup = ({ onClose, addTask, taskName, setTaskName, description, setDescription }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(e);
        onClose();
    };

    return (
        <>
            <div className="blur-background" onClick={onClose}></div>
            <div className="task-popup-overlay">
                <div className="task-popup">
                    <h2>Add New Task</h2>
                    <form onSubmit={handleSubmit} className="task-form">
                        <input
                            type="text"
                            placeholder="Task Name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <div className="popup-buttons">
                            <button type="submit">Add Task</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [isAddingTask, setIsAddingTask] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/task/getTasks', {
                headers: { "token": token },
            });
            setTasks(response.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post('http://localhost:5000/api/task/addTask',
                { taskName, description },
                { headers: { "token": token } }
            );
            setTasks([...tasks, response.data.task]);
            setTaskName('');
            setDescription('');
            setIsAddingTask(false);
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    const deleteTask = async (taskId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete('http://localhost:5000/api/task/deleteTask', {
                headers: { "token": token },
                data: { taskId }
            });
            setTasks(tasks.filter((task) => task._id !== taskId));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const updateTask = async (taskId, newTaskName, newDescription) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put('http://localhost:5000/api/task/updateTask',
                { taskId, taskName: newTaskName, description: newDescription },
                { headers: { "token": token } }
            );
            setTasks(tasks.map((task) => task._id === taskId ? response.data.task : task));
            setEditingTask(null);
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const startEditing = (task) => {
        setEditingTask(task);
    };

    return (
        <div className="app-container">
            <button className="add-task-btn" onClick={() => setIsAddingTask(true)}>
             Add Task
            </button>
            <div className="tasks-container">
                <h1>Tasks</h1>
                <div className="task-list">
                    {tasks.map((task) => (
                        <Task
                            key={task._id}
                            task={task}
                            onDelete={deleteTask}
                            onUpdate={startEditing}
                        />
                    ))}
                </div>
            </div>
            {isAddingTask && (
                <AddTaskPopup
                    onClose={() => setIsAddingTask(false)}
                    addTask={addTask}
                    taskName={taskName}
                    setTaskName={setTaskName}
                    description={description}
                    setDescription={setDescription}
                />
            )}
            {editingTask && (
                <TaskPopup
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onUpdate={updateTask}
                />
            )}
        </div>
    );
};

export default Tasks;