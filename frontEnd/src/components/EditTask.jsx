import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
    const { userId, taskId } = useParams();
    const [task, setTask] = useState({ info: '', date: '', time: '', status: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchTask = async () => {
        try {
            const response = await fetch(`http://localhost:3000/task/${taskId}`);
            if (!response.ok) {
                console.log('Error occured while fetching data');
            }
            const data = await response.json();
            setTask(data);
            setLoading(false);
        } catch (error) {
            setError('Error occured');
            setLoading(false);
        }
    }

    // Handling input changes
    // e is the event object which occurs due to input field changes
    // e.target is the element (input field) which triggered the event
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/tasks/editTask/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });
            if (response.ok) {
                alert('Task Updated successfully');
                navigate(`/userpage/${userId}`);
            } else {
                console.log('Network response was not ok');
            }

        } catch (error) {
            setError('Error updating task');
        }
    };

    useEffect(() => { fetchTask(); }, [taskId]);

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='editTask-container'>
            <form className='editTask-form' onSubmit={handleSubmit}>
                <h2>Edit Task</h2>
                <div className="input-field">
                    <label htmlFor='info'>Info</label>
                    <textarea
                        type="text"
                        id="info"
                        name="info"
                        value={task.info}
                        onChange={handleChange} required />
                </div>
                <div className="input-field">
                    <label htmlFor='date'>Date</label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={task.date}
                        onChange={handleChange} required />
                </div>
                <div className="input-field">
                    <label htmlFor='time'>Time</label>
                    <input
                        type="text"
                        id="time"
                        name="time"
                        value={task.time}
                        onChange={handleChange} required />
                </div>
                <div className="input-field">
                    <label htmlFor='status'>Status</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={task.status}
                        onChange={handleChange} required />
                </div>
                <button className='editTask-button' type='submit'>Update Task</button>
            </form>
        </div>
    );
};

export default EditTask;