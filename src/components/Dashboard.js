import React, { useState } from 'react';
import Affiliatelink from './Affiliatelink';
import '../styles/Dashboard.css';
import CreditScoreTracker from './CreditScoreTracker';
import DisputeManagement from './DisputeManagement';
import ClientManagement from './ClientManagement';
import ClientProfile from './ClientProfile'; // Import the ClientProfile component
import Inquiries from './Inquiries'; // Import the Inquiries component
import WalletSection from './WalletSection'; // Import the WalletSection component

const Dashboard = ({ disputes, onAddDispute }) => {
  // Sample clients data
  const [clients, setClients] = useState([
    { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    // Add more clients as needed
  ]);

  const [selectedClient, setSelectedClient] = useState(null); // State for the selected client
  const [inquiries, setInquiries] = useState([]); // Initialize inquiries

  const handleSelectClient = (client) => {
    setSelectedClient(client); // Set the selected client
  };

  const handleUpdateClient = (updatedClient) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.name === updatedClient.name ? updatedClient : client
      )
    );
    setSelectedClient(updatedClient); // Update the selected client after editing
  };

  const handleAddInquiry = (newInquiry) => {
    setInquiries((prevInquiries) => [...prevInquiries, newInquiry]);
  };

  const handleUpdateInquiry = (id) => {
    setInquiries((prevInquiries) =>
      prevInquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, status: 'Resolved' } : inquiry
      )
    );
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Welcome back,</h2>

      <div className="dashboard-top">
        {/* Credit Score Tracker in its own box */}
        <div className="dashboard-item credit-score-container">
          <CreditScoreTracker />
        </div>

        <div className="dashboard-item">
          <Affiliatelink />
        </div>

        <div className="dashboard-item">
          <DisputeManagement 
            disputes={disputes} 
            onAddDispute={onAddDispute} 
          />
        </div>

        <div className="dashboard-item">
          <Inquiries 
            inquiries={inquiries}
            onAddInquiry={handleAddInquiry}
            onUpdateInquiry={handleUpdateInquiry}
          />
        </div>
        
        {/* Add the WalletSection here */}
        <div className="dashboard-item">
          <WalletSection userId={1} /> {/* Replace '1' with the actual user ID */}
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-item">
          <ClientManagement 
            clients={clients} 
            onSelectClient={handleSelectClient} 
          />
        </div>
      </div>

      {/* Render the ClientProfile component if a client is selected */}
      {selectedClient && (
        <div className="client-profile-container">
          <ClientProfile 
            client={selectedClient} 
            onUpdateClient={handleUpdateClient} 
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
