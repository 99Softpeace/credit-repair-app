import React, { useState } from 'react';
import '../styles/Affiliatelink.css';

const Affiliatelink = () => {
  const affiliateLink = 'https://www.identityiq.com/?aff_id=your_affiliate_id'; // Replace with your actual affiliate link

  const handleAffiliateClick = () => {
      window.open(affiliateLink, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    alert('Affiliate link copied to clipboard!'); // Provide feedback to the user
  };

  return (
      <div className="affiliate-link-container">
          <h2>Partner with Identity IQ</h2>
          <p>Protect your identity and monitor your credit with our partner, Identity IQ. Use the link below to get started:</p>
          <input
              type="text"
              value={affiliateLink}
              readOnly
              onFocus={(e) => e.target.select()} // Select text on focus for easy copying
          />
          <button className="affiliate-butt" onClick={handleAffiliateClick}>
              Get Started with Identity IQ
          </button>
          <button className="copy-button" onClick={handleCopyLink}>
              Copy Affiliate Link
          </button>
      </div>
  );
};

export default Affiliatelink;
