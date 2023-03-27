import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Booking() {

    const [bookings, setBookings] = useState([]);
    let [showDeleteModal, setshowDeleteModal] = useState(false);
    let [showModal, setShowModal] = useState(false);
    let [modalID, setModalID] = useState("");
    let [modalName, setModalName] = useState("");
    let [modalTitle, setModalTitle] = useState("");
    let [modalBody, setModalBody] = useState("");
    let [showbanModal, setshowBanModal] = useState(false);
    let [showunbanModal, setshowUnbanModal] = useState(false);


    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = () => {
        fetch(`http://localhost:5000/getBookings`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setBookings(data.data);
            });

    };

    const deleteModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowDeleteModal(true);

    };

    const banModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowBanModal(true);
    };

    const unbanModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowUnbanModal(true);
    };

    const deleteUser = (id, name) => {
        setshowDeleteModal(false)


        fetch("http://localhost:5000/deleteUser", {
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
                    setModalTitle("Deletion Successful");
                    setModalBody(name + " has been deleted.");
                    setShowModal(true);
                }
                else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    setShowModal(true);
                }
                getBookings();
            });


    };

    const banUser = (id, name) => {
        setshowBanModal(false)

        fetch("http://localhost:5000/banUser", {
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
                    setModalTitle("Ban Successful");
                    setModalBody(name + " has been banned.");
                    setShowModal(true);
                }
                else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    setShowModal(true);
                }
                getBookings();
            });
    };

    const acceptModal = () => {

    }

    const rejectModal = () => {

    }

    const unbanUser = (id, name) => {
        setshowUnbanModal(false)

        fetch("http://localhost:5000/unbanUser", {
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
                    setModalTitle("UnBan Successful");
                    setModalBody(name + " has been unbanned.");
                    setShowModal(true);
                }
                else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    setShowModal(true);
                }
                getBookings();
            });
    };


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th colSpan={6}><h3>Booking</h3></th>
                            </tr>
                            <tr>
                                <th>#</th>
                                <th>Customer Name</th>
                                <th>Venue Name</th>
                                <th>Service Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((i, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{i.customerName}</td>
                                        <td>{i.venueName}</td>
                                        <td>{i.serviceName}</td>
                                        <td>{new Date(i.date).toLocaleDateString()}</td>
                                        <td>{i.time}</td>
                                        <td>{i.status}</td>
                                        {i.status == "Pending" ?
                                            <>
                                                <td><button className="btn btn-primary" onClick={() => acceptModal()}>Accept</button></td>
                                                <td><button className="btn btn-danger" onClick={() => rejectModal()}>Reject</button></td>
                                            </>
                                        : null}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>

            </div>

            {/*removingUsers*/}
            <Modal show={showDeleteModal} onHide={() => setshowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to remove?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Removing user will delete <b>{modalName}</b> from database.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowDeleteModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => deleteUser(modalID, modalName)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*banningUsers*/}
            <Modal show={showbanModal} onHide={() => setshowBanModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to ban?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Banning user will make <b>{modalName}</b> unable to login.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowBanModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => banUser(modalID, modalName)}>
                        Ban
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*unbanninng  bookings*/}
            <Modal show={showunbanModal} onHide={() => setshowUnbanModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to unban?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Unbanning user will make <b>{modalName}</b> able to login.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowUnbanModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => unbanUser(modalID, modalName)}>
                        UnBan
                    </Button>
                </Modal.Footer>
            </Modal>


            {/*success modal*/}
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