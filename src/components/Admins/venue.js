import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Venue() {

    const [Venue, setVenue] = useState([]);
    let [showRejectModal, setshowRejectModal] = useState(false);
    let [showAcceptModal, setshowAcceptModal] = useState(false);
    let [showModal, setShowModal] = useState(false);
    let [modalID, setModalID] = useState("");
    let [modalName, setModalName] = useState("");
    let [modalTitle, setModalTitle] = useState("");
    let [modalBody, setModalBody] = useState("");

    useEffect(() => {
        getVenue();
    }, []);

    const getVenue = () =>{

        fetch('http://localhost:5000/getAllVenue', {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setVenue(data.data);
            });

    };

    const rejectModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowRejectModal(true);

    };

    const rejectVenue = (id, name) => {
        setshowRejectModal(false)


        fetch("http://localhost:5000/deleteVenue", {
            method: "DELETE",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                id: id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "success") {
                    setModalTitle("Rejection Successful");
                    setModalBody(name + " has been rejected.");
                    setShowModal(true);
                }
                else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    setShowModal(true);

                    
                }
                getVenue();
            });


    };

    const acceptModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowAcceptModal(true);

    };

    const acceptVenue = (id, name) => {
        setshowAcceptModal(false);

        fetch("http://localhost:5000/verifyVenue", {
            method: "PUT",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                id: id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "success") {
                    setModalTitle("Verification Successful");
                    setModalBody(name + " has been verified.");
                    setShowModal(true);
                }
                else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    setShowModal(true);
                }
                getVenue();
            });





    };

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th colSpan={6}><h3>Accept Venue</h3></th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Venue Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Created At</th>
                            <th>Created Time</th>
                            {/*<th>Accept</th>*/}
                            {/*<th>Reject</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {Venue.map((i, index) => {
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{i.venueName}</td>
                                    <td>{i.location}</td>
                                    <td>{i.email}</td>
                                    <td>{i.contactInfo}</td>
                                    <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                                    <td>{new Date(i.createdAt).toLocaleTimeString()}</td>
                                    {/*<td><button className="btn btn-success" onClick={() => acceptModal(i._id, i.venueName)}>Accept</button></td>*/}
                                    {/*<td><button className="btn btn-danger" onClick={() => rejectModal(i._id, i.venueName)}>Reject</button></td>*/}
                                </tr>
                                )
                        }) }
                    </tbody>
                </Table>
            </div>
            
        </div>

        //verification for removing
        <Modal show={showRejectModal} onHide={() => setshowRejectModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to reject?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Rejecting venue will delete <b>{modalName}</b> from database.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowRejectModal(false) }>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => rejectVenue(modalID, modalName)}>
                        Reject
                    </Button>
                </Modal.Footer>
            </Modal>

        //verification for accepting

            <Modal show={showAcceptModal} onHide={() => setshowAcceptModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to accept?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Accepting venue will set <b>{modalName}</b> as verified.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowAcceptModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => acceptVenue(modalID, modalName)}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>


        //success modal
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalBody}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        
        </>

    )

}