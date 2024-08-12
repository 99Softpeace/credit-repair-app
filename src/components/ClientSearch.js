import React from 'react';
import '../styles/ClientSearch.css'; // Import the CSS file for styling

const ClientSearch = ({ clients, onSelectClient, filterText, onFilterChange }) => {
  const handleSelect = (client) => {
    onSelectClient(client);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="client-search">
      <input
        type="text"
        placeholder="Search Clients by Name"
        value={filterText}
        onChange={onFilterChange}
        className="search-input"
      />
      {filterText && (
        <ul className="client-list">
          {filteredClients.map(client => (
            <li key={client.id} onClick={() => handleSelect(client)} className="client-item">
              {client.name}
            </li>
          ))}
          {filteredClients.length === 0 && (
            <li className="no-results">No clients found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ClientSearch;
