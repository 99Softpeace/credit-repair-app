import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/DisputeManagement.css';

const DisputeManagement = ({ disputes = [], onAddDispute }) => {
  const [creditor, setCreditor] = useState('');
  const [reason, setReason] = useState('');
  const [complianceDocument, setComplianceDocument] = useState('');
  const [virtualMail, setVirtualMail] = useState(false);
  const [error, setError] = useState('');

  const handleAddDispute = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!creditor || !reason) {
      setError('Creditor and reason are required.');
      return;
    }

    // Create a new dispute object
    const newDispute = {
      id: Date.now(),
      creditor,
      reason,
      status: 'Pending',
      complianceDocument,
      virtualMail,
    };

    // Call the onAddDispute function to update the disputes state in App.js
    onAddDispute(newDispute);

    // Clear the form fields
    setCreditor('');
    setReason('');
    setComplianceDocument('');
    setVirtualMail(false);
    setError(''); // Clear any previous error messages
  };

  const handleUpdateStatus = (id) => {
    const updatedDisputes = disputes.map((dispute) =>
      dispute.id === id ? { ...dispute, status: 'Resolved' } : dispute
    );

    // Update the disputes in App.js by calling onAddDispute with the updated list
    onAddDispute(updatedDisputes);
  };

  const generateDisputeLetter = (dispute) => {
    const letter = `
      [Your Name]
      [Your Address]
      [City, State, Zip]
      [Date]

      [Creditor Name]
      [Creditor Address]
      [City, State, Zip]

      Dear [Creditor],

      I am writing to dispute the following information in my credit report:
      Creditor: ${dispute.creditor}
      Reason: ${dispute.reason}

      Under the Fair Credit Reporting Act (FCRA), I have the right to dispute inaccuracies in my credit report. 
      Please investigate this matter and provide me with the results of your investigation.

      Thank you for your attention to this matter.

      Sincerely,
      [Your Name]
    `;

    console.log(letter); // Simulate letter generation
    alert('Dispute letter generated. Check the console for details.');
  };

  return (
    <div className="dispute-management-container">
      <h2>Dispute Management</h2>

      {/* Add Dispute Form */}
      <form onSubmit={handleAddDispute}>
        <h3>Add Dispute</h3>
        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
        <div>
          <label htmlFor="creditor">Creditor:</label>
          <input
            type="text"
            id="creditor"
            value={creditor}
            onChange={(e) => setCreditor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason:</label>
          <input
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="complianceDocument">Compliance Document:</label>
          <textarea
            id="complianceDocument"
            value={complianceDocument}
            onChange={(e) => setComplianceDocument(e.target.value)}
            placeholder="Enter relevant FCRA laws or notes..."
            rows="4"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={virtualMail}
              onChange={(e) => setVirtualMail(e.target.checked)}
            />
            Use Virtual Mailing Option
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Active Disputes List */}
      <h3 className="act">Active Disputes</h3>
      <ul className="dispute-management-list">
        {disputes.length > 0 ? (
          disputes.map((dispute) => (
            <li key={dispute.id} className="dispute-management-item">
              <div>
                <strong>Creditor:</strong> {dispute.creditor} <br />
                <strong>Reason:</strong> {dispute.reason} <br />
                <strong>Status:</strong> {dispute.status}
              </div>
              <button
                onClick={() => handleUpdateStatus(dispute.id)}
                className="dispute-management-resolve-button"
              >
                Resolve
              </button>
              <button
                onClick={() => generateDisputeLetter(dispute)}
                className="dispute-management-generate-button"
              >
                Generate Letter
              </button>
            </li>
          ))
        ) : (
          <li>No active disputes.</li> // Display when no disputes are available
        )}
      </ul>
    </div>
  );
};

// Prop validation
DisputeManagement.propTypes = {
  disputes: PropTypes.array.isRequired,
  onAddDispute: PropTypes.func.isRequired,
};

export default DisputeManagement;
