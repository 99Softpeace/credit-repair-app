import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the styles for the phone input
import '../styles/ClientForm.css';

const ClientForm = ({ onAddClient }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [goals, setGoals] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!name || !email || !phone || !creditScore || !goals) {
      setError('Please fill out all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Ensure credit score is an integer
    const creditScoreInt = parseInt(creditScore, 10);
    if (isNaN(creditScoreInt) || creditScoreInt < 300 || creditScoreInt > 850) {
      setError('Credit score must be a whole number between 300 and 850');
      return;
    }

    const newClient = {
      id: Date.now(),
      name,
      email,
      phone,
      creditScore: creditScoreInt, // Store as an integer
      goals,
    };

    onAddClient(newClient);
    setSuccess('Client added successfully!');

    // Clear the form
    setName('');
    setEmail('');
    setPhone('');
    setCreditScore('');
    setGoals('');
  };

  return (
    <div className="client-form">
      <h3>Add New Client</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Phone:
          <PhoneInput
            country={'us'}
            value={phone}
            onChange={setPhone}
            required
            inputStyle={{
              width: '100%', // Full width
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              padding: '10px 0 10px 50px', // Add left padding for flag
            }}
          />
        </label>
        <label>
          Credit Score:
          <input
            type="number"
            value={creditScore}
            onChange={(e) => setCreditScore(e.target.value)}
            required
          />
        </label>
        <label>
          Goals:
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Enter client goals here..."
            required
          />
        </label>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
};

export default ClientForm;
