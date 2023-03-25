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

    function printReceipt() {
        const current = new Date();
        const printContent1 = document.getElementById("venueContent").innerHTML;
        const printContent2 = document.getElementById("serviceContent").innerHTML;
        const newWindow = window.open();
        newWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
            h1, p {
              font-family: Lato;
            }
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }

            td, th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }


            </style>
          </head>
          <body>
          <h1>Mero Venue</h1>
          <h3>Receipt</h3>
          <h3>Date: ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}</h3>
        </table>
            ${printContent1}
            </br>
            ${printContent2}
            <h2>Total Pice:  ${totalPrice}</h2>
          </body>
        </html>
      `);
        newWindow.print();
        newWindow.close();
    }



    return (
        <>
            <div id="venueContent">
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th colSpan="3">Venues</th>
                        </tr>
                    </thead>
                    {venue ? <>
                        <tbody>

                            <tr>
                                <th>
                                    {venue.venueName}
                                </th>
                                <th></th>
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
            </div>
            <div id="serviceContent">
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
                

            </div>
            <div className="d-flex justify-content-end">
                <h5>Total price: {totalPrice}</h5>&nbsp;&nbsp;&nbsp;
            </div>
            <div className="d-flex justify-content-end">
                <Button variant="primary" class="hide-on-print" onClick={printReceipt}>Checkout</Button>{' '}
            </div>
           
        </>
    );
    

}

export default Package;