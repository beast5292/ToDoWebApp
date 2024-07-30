import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // It's called response since it holds the response returned by the 'fetch' function
    const response = await fetch('https://to-do-web-aivkndehk-mindulas-projects.vercel.app/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Extract the JSON body content
    const result = await response.json();
    
    if(response.ok && result.message === "Login successful"){
      const userId = result.objectIdOfUser;
      localStorage.setItem('user', JSON.stringify({ userId })); // Store user data
      navigate(`/userpage/${userId}`);
    } else{
      alert('No such account exists');
    }
  }
  return (
    <div className="signin-container">
      <form className='signin-form' onSubmit={handleSubmit}>
        <h2>Signin</h2>
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input 
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='signin-button'>Signin</button>
        <Link to="/">Create an account</Link>
      </form>
    </div>
  );
}

export default Signin;
