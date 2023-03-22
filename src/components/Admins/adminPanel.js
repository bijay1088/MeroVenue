
import React, { useState } from 'react';
import './adminPanel.css';
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

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
                <a href="/">Add new admin</a>
                <a href="/venue">Venue</a>
                <a href="/AcceptVendor">Add Vendor</a>
                <a href="/users">Users</a>
                <a href="#">Contact</a>
                <a onClick={logout}>Logout</a>

            </div>

            
        </div>
    );
}

export default App;


