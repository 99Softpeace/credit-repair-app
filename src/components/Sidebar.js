import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CustomIcon } from '../assets/icons/arrow-left-from-bracket.svg';
import { ReactComponent as HomeIcon } from '../assets/icons/Home-1-Line--Streamline-Mingcute.svg';
import { ReactComponent as MegaphoneIcon } from '../assets/icons/Megaphone--Streamline-Iconoir.svg';
import { ReactComponent as WalletIcon } from '../assets/icons/Wallet--Streamline-Platinum.svg';
import { ReactComponent as ChartIcon } from '../assets/icons/Baseline-Chart--Streamline-Ultimate.svg';
import { ReactComponent as CommentsIcon } from '../assets/icons/Chat-Bubble-Text-Oval--Streamline-Core.svg';
import { ReactComponent as CogIcon } from '../assets/icons/Cog--Streamline-Ultimate.svg';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <ul>
          <li className="sidebar-item">
            <Link to="/">
              <div className="icon-wrapper">
                <HomeIcon className="sidebar-icon HomeIcon" />
              </div>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/">
              <div className="icon-wrapper">
                <MegaphoneIcon className="sidebar-icon MegaphoneIcon" />
              </div>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/wallet">
              <div className="icon-wrapper">
                <WalletIcon className="sidebar-icon WalletIcon" />
              </div>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/credit-score-tracker">
              <div className="icon-wrapper">
                <ChartIcon className="sidebar-icon ChartIcon" />
              </div>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/inquiries">
              <div className="icon-wrapper">
                <CommentsIcon className="sidebar-icon CommentsIcon" />
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <ul>
          <li className="sidebar-item">
            <Link to="/settings">
              <div className="icon-wrapper">
                <CogIcon className="sidebar-icon CogIcon" />
              </div>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/logout">
              <div className="icon-wrapper">
                <CustomIcon className="sidebar-icon custom-icon" />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
