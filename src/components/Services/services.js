import React from 'react'
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import ServiceDisplay from './serviceDisplay.js';

export default function Services() {

    const [services, setServices] = React.useState([]);
    useEffect(() => {
        getService();
    }, []);

    const getService = () => {

        fetch('http://localhost:5000/getAllServices', {
        method: "GET",
    })
        .then((res) => res.json())
            .then((data) => {
                setServices(data.data);
        });

};

    return (
       
        <div>

            <ServiceDisplay services={services} />

        </div>

    )
    
}