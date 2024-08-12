import React, { useState } from 'react';
import '../styles/CreditScoreTracker.css';
import CreditScoreChart from './CreditScoreChart';

// Import the score images
import transUnionImage from '../assets/img/TransUnion-logo.png';
import equifaxImage from '../assets/img/Equifax-logo.png';
import experianImage from '../assets/img/Experian-Logo.png';

const CreditScoreTracker = () => {
  const [clients, setClients] = useState([
    {
      name: 'John Doe',
      scores: {
        transUnion: [
          { score: 720, date: '2024-07-01' },
          { score: 695, date: '2024-07-15' },
          { score: 725, date: '2024-07-30' },
          { score: 740, date: '2024-08-08' },
        ],
        equifax: [
          { score: 710, date: '2024-07-01' },
          { score: 680, date: '2024-07-15' },
          { score: 720, date: '2024-07-30' },
          { score: 735, date: '2024-08-08' },
        ],
        experian: [
          { score: 730, date: '2024-07-01' },
          { score: 695, date: '2024-07-15' },
          { score: 740, date: '2024-07-30' },
          { score: 745, date: '2024-08-08' },
        ],
      },
      document: null, // For document upload feature
    },
    // Add more clients as needed
  ]);

  const [document, setDocument] = useState(null);

  const calculateAlerts = (client) => {
    const alerts = [];
    const { transUnion, equifax, experian } = client.scores;

    const lastTransUnionScore = transUnion[transUnion.length - 1].score;
    const lastEquifaxScore = equifax[equifax.length - 1].score;
    const lastExperianScore = experian[experian.length - 1].score;

    if (lastTransUnionScore < 700) {
      alerts.push("Alert: Your TransUnion score is below 700. Please check for potential issues.");
    }

    if (lastEquifaxScore < 700) {
      alerts.push("Alert: Your Equifax score is below 700. Consider reviewing your credit report.");
    }

    if (lastExperianScore < 700) {
      alerts.push("Alert: Your Experian score is below 700. It's important to address any discrepancies.");
    }

    return alerts;
  };

  const handleDocumentUpload = (e) => {
    setDocument(e.target.files[0]); // Capture the uploaded document
  };

  return (
    <div className="credit-score-tracker">
      {clients.map((client) => {
        const alerts = calculateAlerts(client);
        const latestTransUnionScore = client.scores.transUnion[client.scores.transUnion.length - 1].score;
        const latestEquifaxScore = client.scores.equifax[client.scores.equifax.length - 1].score;
        const latestExperianScore = client.scores.experian[client.scores.experian.length - 1].score;

        return (
          <div key={client.name} className="client-container">
            <h3 className="client-name">{client.name}</h3>
            <div className="credit-scores">
              <div className="score-image">
                <img src={transUnionImage} alt="TransUnion Score" />
                <span>{latestTransUnionScore}</span>
                <a href={`/credit-report/${client.name}/transunion`} className="detail-link">View Details</a>
              </div>
              <div className="score-image">
                <img src={equifaxImage} alt="Equifax Score" />
                <span>{latestEquifaxScore}</span>
                <a href={`/credit-report/${client.name}/equifax`} className="detail-link">View Details</a>
              </div>
              <div className="score-image">
                <img src={experianImage} alt="Experian Score" />
                <span>{latestExperianScore}</span>
                <a href={`/credit-report/${client.name}/experian`} className="detail-link">View Details</a>
              </div>
            </div>
            <div className="on-time">On Time: 24/38</div>
            <div className="recent-changes">Recent Changes: <span style={{ color: 'green' }}>↑ 720</span></div>
            {alerts.length > 0 && (
              <div className="alerts">
                {alerts.map((alert, index) => (
                  <div key={index} className="alert">
                    {alert}
                  </div>
                ))}
              </div>
            )}
            <div className="chart">
              <CreditScoreChart client={client} />
            </div>
            {/* Document Upload Feature */}
            <div className="document-upload">
              <label htmlFor={`document-upload-${client.name}`}>Upload Document:</label>
              <input
                type="file"
                id={`document-upload-${client.name}`}
                onChange={handleDocumentUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              {document && <p>Uploaded: {document.name}</p>}
            </div>
            {/* Client-Specific Tips */}
            <div className="client-tips">
              <h4>Tips for {client.name}</h4>
              <ul>
                <li>Check your credit report regularly for errors.</li>
                <li>Keep your credit utilization below 30%.</li>
                <li>Pay your bills on time to maintain a good score.</li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CreditScoreTracker;
