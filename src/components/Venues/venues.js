import React from 'react'
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import VenueDisplay from './venueDisplay.js';

export default function Venues() {

    const [venues, setVenues] = React.useState([]);
    useEffect(() => {
        getVenue();
    }, []);

    const getVenue = () => {

        fetch('http://localhost:5000/getAllVenue', {
        method: "GET",
    })
        .then((res) => res.json())
            .then((data) => {
                setVenues(data.data);
        });

};

    return (
       
        <div>

            <VenueDisplay venues={venues} />

        </div>

    )
    
}