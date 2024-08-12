// LoginForm.js
import React, { useState } from 'react';
import '../styles/LoginForm.css'; // Import the CSS file for styling

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login process (replace with actual authentication)
    onLogin(role);
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
