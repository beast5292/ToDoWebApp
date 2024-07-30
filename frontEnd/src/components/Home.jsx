import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert('Account Created');
      setUsername('');
      setPassword('');
    } else {
      alert('An error occured');
    }
  };

  return (
    <div className="signup-container">
      <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Signup</h2>
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
        <button type="submit" className='signup-button'>Signup</button>
        <Link to="/signin">Have an account</Link>
      </form>
    </div>
  );
}

export default Home;
