import React, { useState, useEffect } from 'react';
import ClientList from './ClientList';
import ClientForm from './ClientForm';
import ClientProfile from './ClientProfile';
import ClientSearch from './ClientSearch';
import '../styles/ClientManagement.css';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [filterText, setFilterText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);

  // Mock data for clients
  const mockClients = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', creditScore: 720 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', creditScore: 680 },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-123-4567', creditScore: 740 },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', phone: '444-987-6543', creditScore: 690 },
    { id: 5, name: 'Charlie White', email: 'charlie@example.com', phone: '222-333-4444', creditScore: 710 },
  ];

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setClients(mockClients);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = (newClient) => {
    try {
      setClients((prevClients) => [...prevClients, newClient]);
    } catch (error) {
      setError('Failed to add client');
    }
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  const handleUpdateClient = (updatedClient) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
    setSelectedClient(null);
  };

  const handleDeleteClient = (clientId) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedClients = filteredClients.sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'creditScore') {
      return a.creditScore - b.creditScore;
    }
    return 0;
  });

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = sortedClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(sortedClients.length / clientsPerPage);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const userRole = 'admin';

  return (
    <div className="client-management">
      <h2>Client Management</h2>
      <ClientSearch
        clients={clients}
        onSelectClient={handleSelectClient}
        filterText={filterText}
        onFilterChange={handleFilterChange}
      />
      
      {userRole === 'admin' || userRole === 'specialist' ? (
        <ClientForm onAddClient={handleAddClient} />
      ) : (
        <p>You do not have permission to add clients.</p>
      )}

      <label>
        Sort By:
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="creditScore">Credit Score</option>
        </select>
      </label>

      <ClientList
        clients={currentClients}
        onSelectClient={handleSelectClient}
        onDeleteClient={handleDeleteClient}
      />

      <div className="pagination-controls">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {selectedClient && (
        <ClientProfile
          client={selectedClient}
          onUpdateClient={handleUpdateClient}
          onBack={() => setSelectedClient(null)} // Add this line to handle back navigation
        />
      )}
    </div>
  );
};

export default ClientManagement;
