import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function Package() {

    const [venue, setVenue] = React.useState("");
    const [services, setServices] = React.useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    function fetchData() {
        fetch("http://localhost:5000/getManager", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    setVenue(data.data.venue[0]);
                    setServices(data.data.service);
                }


            })
    }

    function priceCalculator() {
        let total = venue.price;
        services.forEach(service => {
            total += service.price;
        });
        setTotalPrice(total);
    }
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        priceCalculator();
    }, [services, venue]);

    //function getVenue(id) {
    //    fetch(`http://localhost:5000/getVenue/${id}`, {
    //        method: "GET",
    //    })
    //        .then((res) => res.json())
    //        .then((data) => {
    //            setVenue(data.data);

    //        });

    //}

    //async function getVenue(id) {
    //    const res = await fetch(`http://localhost:5000/getVenue/${id}`, {
    //        method: "GET",
    //    });
    //    const data = await res.json();
    //    setVenue(data.date);

    //}

    //function getService(id) {
    //    fetch(`http://localhost:5000/getService/${id}`, {
    //        method: "GET",
    //    })
    //        .then((res) => res.json())
    //        .then((data) => {
    //            setServices((services) => [...services, data.data])
    //        });
    //}

    

    return (
        <>
           <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th colSpan="2">Venues</th>
                    </tr>
                </thead>
                {venue ? <>
                    <tbody>

                        <tr>
                            <th>
                                {venue.venueName}
                            </th>
                            <th>
                                {venue.price}
                            </th>
                        </tr>
                    </tbody>
                </> :
                    <tbody>
                        <tr>
                            <th colSpan="2">No Venue Added.</th>
                        </tr>
                    </tbody>

                 }
           </Table>
           <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th colSpan="3">Services</th>
                    </tr>
                </thead>
                {services ? <>
                    <tbody>
                        {services.map((service) => (
                            <tr>
                                <th>
                                    {service.serviceName}
                                </th>
                                <th>
                                    {service.serviceType}
                                </th>
                                <th>
                                    {service.price}
                                </th>
                            </tr>
                        ))}
                    </tbody>

                </> :
                    <tbody>
                        <tr>
                            <th colSpan="3">No Services Added.</th>
                        </tr>
                    </tbody>

                }    
            </Table>
            <div className="d-flex justify-content-end">
                <h5>Total price: {totalPrice}</h5>&nbsp;&nbsp;&nbsp;
                <Button variant="primary">Checkout</Button>{' '}
            </div>

        </>
    );
    

}

export default Package;