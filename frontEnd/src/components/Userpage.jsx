import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Userpage = () => {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await fetch(`https://to-do-web-aivkndehk-mindulas-projects.vercel.app/tasks/${userId}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  const buttonNavigate = () => {
    navigate(`/task/${userId}`)
  }

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('user'); // Assuming user data is stored in local storage

    // Navigate to homepage
    navigate('/', { replace: true }); // 'replace: true' to replace the current entry in history stack
  }

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  return (
    <div>
      <h1>User Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={buttonNavigate}>Add Task</button>
      <h2>Tasks:</h2>
      <li className='task-container'>
        <div>Title</div>
        <div>Date</div>
        <div>Time</div>
        <div>Status</div>
        <div className='invisible-elements'>Option1</div>
        <div className='invisible-elements'>Option2</div>
      </li>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className='task-container'>
            <div>{task.info}</div>
            <div>{task.date}</div>
            <div>{task.time}</div>
            <div>{task.status}</div>
            <Link to={`/tasks/editTask/${userId}/${task._id}`}>Edit Task</Link><br />
            <Link to={`/tasks/deleteTask/${userId}/${task._id}`}>Delete task</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Userpage;
