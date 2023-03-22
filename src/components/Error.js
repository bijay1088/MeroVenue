import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
            
                <h1>404 Page Not Found</h1>
                <p>We're sorry, but the page you requested could not be found.</p>
                <p>Press <Link to="/">here</Link> to return to the home page.</p>
            </div>
        </div>
    );
};

export default NotFoundPage;
