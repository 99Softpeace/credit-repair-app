import React, { useState, useEffect } from 'react';
import '../styles/ClientProfile.css'; // Import the CSS file for styling

const ClientProfile = ({ client, onUpdateClient, onBack }) => {
  const [updatedClient, setUpdatedClient] = useState(client);

  useEffect(() => {
    setUpdatedClient(client);
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient({ ...updatedClient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateClient(updatedClient);
  };

  return (
    <div className="client-profile">
      <h3>Client Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={updatedClient.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={updatedClient.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input 
            type="tel" 
            name="phone" 
            value={updatedClient.phone} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Credit Score:</label>
          <input 
            type="number" 
            name="creditScore" 
            value={updatedClient.creditScore} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Goals:</label>
          <textarea
            name="goals"
            value={updatedClient.goals}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn update-btn">Update Client</button>
          <button type="button" className="btn back-btn" onClick={onBack}>Back to Client List</button>
        </div>
      </form>
    </div>
  );
};

export default ClientProfile;
