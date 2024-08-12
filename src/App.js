import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import CreditScoreTracker from './components/CreditScoreTracker';
import ClientManagement from './components/ClientManagement';
import Inquiries from './components/Inquiries';
import DisputeManagement from './components/DisputeManagement';
import Reports from './components/Reports';
import Workflows from './components/Workflows';
import Billing from './components/Billing';
import Support from './components/Support';
import WalletSection from './components/WalletSection';
import './styles/App.css';

function App() {
  const [disputes, setDisputes] = useState([]); // Initializing disputes as an empty array

  const handleAddDispute = (newDispute) => {
    setDisputes((prevDisputes) => [...prevDisputes, newDispute]);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard disputes={disputes} onAddDispute={handleAddDispute} />} 
            />
            <Route path="/credit-score-tracker" element={<CreditScoreTracker />} />
            <Route path="/client-management" element={<ClientManagement />} />
            <Route path="/inquiries" element={<Inquiries />} />
            <Route 
              path="/dispute-management" 
              element={<DisputeManagement disputes={disputes} onAddDispute={handleAddDispute} />} 
            />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/Workflows" element={<Workflows />} />
            <Route path="/Billing" element={<Billing />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/wallet" element={<WalletSection />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

