import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Inquiries.css';

const Inquiries = ({ inquiries, onAddInquiry, onUpdateInquiry }) => {
  const [newInquiry, setNewInquiry] = useState('');
  const [error, setError] = useState('');

  const handleAddInquiry = (e) => {
    e.preventDefault();
    if (!newInquiry) {
      setError('Inquiry details are required.');
      return;
    }

    onAddInquiry({ id: Date.now(), details: newInquiry, status: 'Pending' });
    setNewInquiry('');
    setError('');
  };

  const handleUpdateStatus = (id) => {
    onUpdateInquiry(id);
  };

  return (
    <div className="inquiries-container">
      <h2>Inquiries Management</h2>
      <form onSubmit={handleAddInquiry}>
        <h3>Add New Inquiry</h3>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label htmlFor="inquiryDetails">Inquiry Details:</label>
          <input
            type="text"
            id="inquiryDetails"
            value={newInquiry}
            onChange={(e) => setNewInquiry(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Inquiry</button>
      </form>

      <h3>Active Inquiries</h3>
      <ul className="inquiries-list">
        {inquiries.length > 0 ? (
          inquiries.map(inquiry => (
            <li key={inquiry.id} className="inquiry-item">
              <div>
                <strong>Details:</strong> {inquiry.details} <br />
                <strong>Status:</strong> {inquiry.status}
              </div>
              <button 
                onClick={() => handleUpdateStatus(inquiry.id)} 
                className="update-status-button"
              >
                Mark as Resolved
              </button>
            </li>
          ))
        ) : (
          <li>No active inquiries.</li>
        )}
      </ul>
    </div>
  );
};

// Prop validation
Inquiries.propTypes = {
  inquiries: PropTypes.array.isRequired,
  onAddInquiry: PropTypes.func.isRequired,
  onUpdateInquiry: PropTypes.func.isRequired,
};

export default Inquiries;
