import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../styles/DisputeManagement.css';

const DisputeManagement = () => {
  const [disputes, setDisputes] = useState([]);
  const [creditor, setCreditor] = useState('');
  const [reason, setReason] = useState('');
  const [complianceDocument, setComplianceDocument] = useState('');
  const [virtualMail, setVirtualMail] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/disputes/all');
        setDisputes(response.data);
      } catch (error) {
        console.error('Error fetching disputes:', error);
        setError('Failed to fetch disputes. Please try again later.');
      }
    };

    fetchDisputes();
  }, []);

  const resetForm = () => {
    setCreditor('');
    setReason('');
    setComplianceDocument('');
    setVirtualMail(false);
    setError('');
  };

  const handleAddDispute = async (e) => {
    e.preventDefault();

    if (!creditor || !reason) {
      setError('Creditor and reason are required.');
      return;
    }

    const newDispute = {
      creditor,
      reason,
      complianceDocument,
      virtualMail,
      status: 'Pending',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/disputes/create', newDispute);
      setDisputes([...disputes, response.data.dispute]);
      resetForm();
    } catch (error) {
      console.error('Error creating dispute:', error);
      setError('Failed to add dispute. Please try again later.');
    }
  };

  const handleUpdateStatus = async (id) => {
    if (!id) {
      console.error('Invalid dispute ID:', id);
      setError('Invalid dispute ID. Please try again.');
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/api/disputes/update/${id}`, { status: 'Resolved' });
      
      const updatedDisputes = disputes.map((dispute) =>
        dispute.id === id ? { ...dispute, status: 'Resolved' } : dispute
      );

      setDisputes(updatedDisputes);
    } catch (error) {
      console.error('Error updating dispute status:', error);
      setError('Failed to update dispute status. Please try again later.');
    }
  };

  const generateDisputeLetter = (dispute) => {
    const letter = `
      [Your Name]
      [Your Address]
      [City, State, Zip]
      ${new Date().toLocaleDateString()}

      ${dispute.creditor}
      [Creditor Address]
      [City, State, Zip]

      Dear ${dispute.creditor},

      I am writing to dispute the following information in my credit report:
      Creditor: ${dispute.creditor}
      Reason: ${dispute.reason}

      Under the Fair Credit Reporting Act (FCRA), I have the right to dispute inaccuracies in my credit report. 
      Please investigate this matter and provide me with the results of your investigation.

      Thank you for your attention to this matter.

      Sincerely,
      [Your Name]
    `;

    const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'DisputeLetter.txt';
    link.click();
  };

  return (
    <div className="dispute-management-container">
      <h2>Dispute Management</h2>

      <form onSubmit={handleAddDispute}>
        <h3>Add Dispute</h3>
        {error && <p className="error-message">{error}</p>}
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
          <li>No active disputes.</li>
        )}
      </ul>
    </div>
  );
};

export default DisputeManagement;
