import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Toast } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function Package() {

    const [venue, setVenue] = React.useState("");
    const [services, setServices] = React.useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(null);
    const [toastTitle, setToastTitle] = React.useState("");
    const [toastBody, setToastBody] = React.useState("");
    const [showBookModal, setshowBookModal] = useState(false);
    const [number, setNumber] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [noNumber, setNoNumber] = useState(true);
    const [error, setError] = useState("");

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
        let total = 0
        if (venue) {
            total = venue.price;
        }
        
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

    //show booking modal
    function showModal() {
            fetch("http://localhost:5000/getUserPhoneNumber", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem("token")
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        console.log(data.data);
                        if (data.data == undefined || data.data == "") {
                            setNumber("");
                            setNoNumber(true);
                        }
                        else {
                            setNoNumber(false);
                            setNumber(data.data);
                        }

                        setshowBookModal(true);
                    }
                    else if (data.status == "error") {
                        console.log(data.data);
                        setToastTitle("Error");
                        setToastBody(data.message);
                        showToast(3000);
                    }
                });
    }

    //show toast
    const showToast = (duration) => {
        setShow(true);
        setTimer(setTimeout(() => setShow(false), duration));
    };

    //book now
    const booknow = () => {

        if (isNaN(number)) {
            setError("Please enter a valid contact number");
            return;
        }

        //check if address is empty or not
        if (!date) {
            setError("Please enter date");
            return;
        }

        if (!time) {
            setError("Please enter time")
            return;
        }


        if (noNumber) {
            fetch("http://localhost:5000/setUserPhoneNumber", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem("token"),
                    phoneNumber: number

                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        console.log("Number added")
                        console.log(number);
                        setError("");
                    }
                    else if (data.status == "error") {
                        setError(data.data);
                    }
                });

        }

        if (venue) {
            fetch("http://localhost:5000/bookings", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem("token"),
                    venueID: venue._id,
                    serviceID: null,
                    date: date,
                    time: time
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        setshowBookModal(false);
                        setToastTitle("Successful");
                        setToastBody("Venue has been registered.");
                        showToast(3000);

                    }
                    else if (data.status == "error") {
                        setError(data.data);
                    }
                });
        }

        if (services.length > 0) {
            services.map ((i) => {
                fetch("http://localhost:5000/bookings", {
                    method: "POST",
                    crossDomain: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                        token: window.localStorage.getItem("token"),
                        venueID: null,
                        serviceID: i._id,
                        date: date,
                        time: time
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.status == "success") {
                            setshowBookModal(false);
                            setToastTitle("Successful");
                            setToastBody("Service has been registered.");
                            showToast(3000);

                        }
                        else if (data.status == "error") {
                            setError(data.data);
                        }
                    });
            })
        }

        fetch("http://localhost:5000/checkout", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token")
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "success") {
                    printReceipt();
                    fetchData();
                }
                else if (data.status == "error") {
                    setError(data.data);
                }
            });
        
        
    }


    //show receipt
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
                    {services.length > 0 ? <>
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


            {venue || services.length > 0 ? 

                <>
                    <div className="d-flex justify-content-end">
                        <h5>Total price: {totalPrice}</h5>&nbsp;&nbsp;&nbsp;
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" class="hide-on-print" onClick={showModal}>Checkout</Button>{' '}
                    </div>
                </>
                :null }
            
            


            <Modal show={showBookModal} onHide={() => setshowBookModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Now</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!noNumber ? null : <div className="form-group mt-3 col-md-9">
                        <label>Contact Number</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="9xxxxxxxxx"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    }


                    <div className="form-group mt-3 col-md-6">
                        <label>Date</label>
                        <input
                            type="date"
                            className="form-control mt-1"
                            value={date}
                            onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className="form-group mt-3 col-md-6">
                        <label>Time</label>
                        <input
                            type="time"
                            className="form-control mt-1"
                            value={time}
                            onChange={(e) => setTime(e.target.value)} />
                    </div>
                    {<div className="error-message mt-3">{error}</div>}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowBookModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => booknow()}>
                        Book
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
    

}

export default Package;