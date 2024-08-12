import React, { useState, useEffect } from 'react';
import '../styles/WalletSection.css'; // Create a separate CSS file for styling

const WalletSection = ({ userId }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [lastMonthBalance, setLastMonthBalance] = useState(0);
  const [yearlyAverage, setYearlyAverage] = useState(0);
  
  useEffect(() => {
    // Fetch wallet data from the API (mocked here for demonstration)
    const fetchWalletData = async () => {
      const response = await fetch(`/api/users/${userId}/wallet`);
      const data = await response.json();
      setBalance(data.balance);
      setTransactions(data.transactions);
      setLastMonthBalance(data.lastMonthBalance); // Assuming this is returned from the API
      setYearlyAverage(data.yearlyAverage); // Assuming this is returned from the API
    };

    fetchWalletData();
  }, [userId]);

  const changePercentage = lastMonthBalance 
    ? (((balance - lastMonthBalance) / lastMonthBalance) * 100).toFixed(2) 
    : 0;

  return (
    <div className="wallet-section">
      <h3>Wallet Balance</h3>
      <div className="balance">Balance: ${balance.toFixed(2)}</div>
      <div className="yearly-average">
        Yearly Average: ${yearlyAverage.toFixed(2)}
      </div>
      <div className="comparison">
  Compared to last month: {changePercentage >= 0 ? '↗️' : '↘️'} {Math.abs(changePercentage)}%
</div>

      <div className="how-it-works">
        <a href="/how-it-works">How It Works</a>
      </div>
      <h4>Transaction History</h4>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.date} - {transaction.description} - ${transaction.amount.toFixed(2)}
          </li>
        ))}
      </ul>
      <div className="video-container">
        {/* Add video or video component here */}
        <iframe
          width="100%"
          height="150" // Adjust height as needed
          src="https://www.youtube.com/embed/example" // Replace with actual video URL
          title="How It Works Video"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default WalletSection;
