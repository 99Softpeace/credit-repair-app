import React, { useState } from 'react';
import profileImagePlaceholder from '../assets/img/ProfileIMG.jpg';
import { ReactComponent as ArrowdownIcon } from '../assets/icons/Arrow-Button-Down--Streamline-Ultimate.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/Search-1--Streamline-Ultimate.svg';
import { ReactComponent as BellIcon } from '../assets/icons/Bell--Streamline-Iconoir.svg';
import { ReactComponent as ArrowleftIcon } from '../assets/icons/Arrow-Left-1--Streamline-Ultimate.svg';
import { ReactComponent as ArrowrightIcon } from '../assets/icons/Arrow-Right-1--Streamline-Ultimate.svg';
import '../styles/TopBar.css';

const TopBar = () => {
    const [profileImage, setProfileImage] = useState(profileImagePlaceholder);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New message from John", read: false },
        { id: 2, message: "Your report is ready", read: false },
        { id: 3, message: "New comment on your post", read: false },
    ]);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        setProfileImage(profileImagePlaceholder);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const toggleNotifications = () => {
        setNotificationOpen((prev) => !prev);
        if (notificationOpen) {
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) => ({ ...notification, read: true }))
            );
        }
    };

    const email = "user@example.com"; // Replace with the actual email

    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <div className="dropdown">
                    <button className="dropdown-button">
                        Dashboard
                        <ArrowdownIcon className="dropdown-icon" />
                    </button>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Stom Campaign" className="search-input" />
                    <button className="search-button">
                        <SearchIcon className="search-icon" />
                    </button>
                </div>
            </div>
            <div className="top-bar-right">
                <button className="icon-button" onClick={toggleNotifications}>
                    <BellIcon className="bell-icon" />
                    {notifications.some((n) => !n.read) && <span className="notification-dot"></span>}
                    <span className="notification-text">{notifications.filter(n => !n.read).length} new</span>
                </button>
                {notificationOpen && (
                    <div className="notification-container">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                            >
                                <span onClick={() => {
                                    setNotifications((prevNotifications) =>
                                        prevNotifications.map((n) =>
                                            n.id === notification.id ? { ...n, read: true } : n
                                        )
                                    );
                                }}>
                                    {notification.message}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                <button className="icon-button">
                    <ArrowleftIcon className="arrow-icon" /> {currentDate} <ArrowrightIcon className="arrow-icon" />
                </button>
                <div className="profile-container">
                    <div className="profile-info">
                        <img className="profile-image" src={profileImage} alt="Profile" />
                        <div className="profile-details">
                            <span className="profile-name">Hossein</span>
                            <a href={`mailto:${email}`} className="profile-email">{email}</a>
                        </div>
                        <ArrowdownIcon className="profile-dropdown-icon" onClick={toggleDropdown} />
                        {dropdownOpen && (
                            <div className="profile-dropdown-menu">
                                <input type="file" id="file-input" onChange={handleImageUpload} hidden />
                                <label htmlFor="file-input" className="dropdown-menu-item">Upload Image</label>
                                <button className="dropdown-menu-item" onClick={handleImageDelete}>Delete Image</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
