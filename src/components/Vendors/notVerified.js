import React from 'react';
import { Link } from 'react-router-dom';

export default function NotVerified() {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>

                <h1>401 Unauthorized</h1>
                <p>Your account has not been verified yet. Please fill up the KYC form and wait until one of the admin verify it.</p>
                <p>If you have been waiting for long and not been verified, contact us at 9xxxxxxxxx with your credentials.</p>
                <p>Press <Link to="/kyc">here</Link> to open KYC form page.</p>
            </div>
        </div>
    );

}