import axios from 'axios';
import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Posting data to server...");
      console.log("Email:", email);
      console.log("Password:", password);

      const response = await axios.post('https://16.171.2.241:3000/register', { email, password });

      console.log("Server response received");

      setMessage(response.data.message);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error occurred:', error);
      setMessage(error.response ? error.response.data.message : 'Server error occurred');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
