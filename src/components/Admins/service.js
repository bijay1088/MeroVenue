import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Service() {

    const [Service, setService] = useState([]);
    let [showRejectModal, setshowRejectModal] = useState(false);
    let [showAcceptModal, setshowAcceptModal] = useState(false);
    let [showModal, setShowModal] = useState(false);
    let [modalID, setModalID] = useState("");
    let [modalName, setModalName] = useState("");
    let [modalTitle, setModalTitle] = useState("");
    let [modalBody, setModalBody] = useState("");

    useEffect(() => {
        getService();
    }, []);

    const getService = () => {

        fetch('http://localhost:5000/getAllServices', {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setService(data.data);
            });

    };

    const rejectModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowRejectModal(true);

    };

    const rejectService = (id, name) => {
        setshowRejectModal(false)


        fetch("http://localhost:5000/deleteService", {
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
                getService();
            });


    };

    const acceptModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowAcceptModal(true);

    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th colSpan={6}><h3>Services</h3></th>
                            </tr>
                            <tr>
                                <th>#</th>
                                <th>Service Name</th>
                                <th>Type</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Created At</th>
                                <th>Created Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Service.map((i, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{i.serviceName}</td>
                                        <td>{i.serviceType}</td>
                                        <td>{i.location}</td>
                                        <td>{i.email}</td>
                                        <td>{i.contactInfo}</td>
                                        <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                                        <td>{new Date(i.createdAt).toLocaleTimeString()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>

            </div>

            {/*verification for removing*/}
            <Modal show={showRejectModal} onHide={() => setshowRejectModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to reject?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Rejecting venue will delete <b>{modalName}</b> from database.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowRejectModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => rejectService(modalID, modalName)}>
                        Reject
                    </Button>
                </Modal.Footer>
            </Modal>

            

            { /*success modal*/}
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