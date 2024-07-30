import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteTask = () => {
    const { userId, taskId } = useParams();
    const navigate = useNavigate();

    const deleteTask = async () => {
        try {
            const response = await fetch(`https://to-do-web-5zncjxi65-mindulas-projects.vercel.app/tasks/deleteTask/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                navigate(`/userpage/${userId}`);
            } else {
                console.log('Error deleting task');
            }
        } catch (error) {
            console.log("An error occured");
        }
    };

    useEffect(() => {
        deleteTask()
    }, [userId, taskId]);
    return (
        <div>Deleting Task.....</div>
    )
};

export default DeleteTask;
