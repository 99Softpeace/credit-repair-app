import React from 'react';
import '../styles/ClientList.css'; // Ensure your CSS file is imported

const ClientList = ({ clients, onSelectClient, onDeleteClient }) => {
  return (
    <div>
      <h3 className="client-list-heading">Client List</h3>
      {clients.length === 0 ? (
        <p>No clients added yet.</p>
      ) : (
        <ul className="client-list">
          {clients.map(client => (
            <li key={client.id} className="client-list-item">
              <span
                onClick={() => onSelectClient(client)}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => e.key === 'Enter' && onSelectClient(client)}
              >
                {client.name} - {client.email} - {client.phone}
              </span>
              <button onClick={() => onDeleteClient(client.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientList;
