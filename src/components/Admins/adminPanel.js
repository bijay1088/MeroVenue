
import React, { useState } from 'react';
import './adminPanel.css';
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        window.localStorage.clear();
        navigate('/');
        window.location.reload(false);
    };

    return (
        <div>
            <div className={`sidenav ${isOpen ? 'open' : ''}`}>
                <a className="closebtn" onClick={toggleNav}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </a>
                
            </div>
            <div className={`sidenav-content ${isOpen ? 'open' : ''}`}>
                <Link to="/">
                        Dashboard
                </Link>
                <Link to="/addAdmin">
                    Add new admin
                </Link>
                <Link to="/venue">
                    Venue
                </Link>
                <Link to="/service">
                    Service
                </Link>
                <Link to="/AcceptVendor">
                    Add Vendor
                </Link>
                <Link to="/users">
                    Users
                </Link>
                <Link to="/bookings">
                    Bookings
                </Link>
                <Link to="/pendingbookings">
                    Pending Bookings
                </Link>
                <Link to=""
                    onClick={logout}>
                    Logout
                </Link>
            </div>

            
        </div>
    );
}

export default App;


