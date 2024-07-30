import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const AddTask = () => {
    const [info, setInfo] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('https://to-do-web-aivkndehk-mindulas-projects.vercel.app/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ info, date, time, status, userId }),
        });

        if (response.ok) {
            alert('Task Added');
            setInfo('');
            setDate('');
            setTime('');
            setStatus('');
            navigate(`/userpage/${userId}`);
        } else {
            alert('An error occured');
        }
    }

    return (
        <div className="addTask-container">
            <form className='addTask-form' onSubmit={handleSubmit}>
                <h2>AddTask</h2>
                <div className="input-field">
                    <label htmlFor="info">Title</label>
                    <input
                        type="text"
                        id="info"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="date">Date</label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="time">Time</label>
                    <input
                        type="text"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="status">Status</label>
                    <input
                        type="text"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='addTask-button'>Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;