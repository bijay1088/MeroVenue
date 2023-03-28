import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { Toast } from 'react-bootstrap';

export default function HeaderAndFooterExample() {
    const [bookings, setBookings] = useState([]);
    let [modalID, setModalID] = useState("");
    let [modalName, setModalName] = useState("");
    let [modalTitle, setModalTitle] = useState("");
    let [modalBody, setModalBody] = useState("");
    let [showAcceptModal, setshowAcceptModal] = useState(false);
    let [showRejectModal, setshowRejectModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(null);

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

    const showToast = (duration) => {
        setShow(true);
        setTimer(setTimeout(() => setShow(false), duration));
    };

    const acceptModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowAcceptModal(true);

    }

    const rejectModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowRejectModal(true);
    }

    const acceptBooking = (id) => {
        setshowAcceptModal(false);
        fetch("http://localhost:5000/acceptBooking", {
            method: "POST",
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
                    setModalTitle("Successful");
                    setModalBody(modalName + " has been accepted successfully.");
                    showToast(3000);
                }
                else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    showToast(3000);

                }
                getBookings();
            });
    }

    const rejectBooking = (id) => {
        setshowRejectModal(false);
        fetch("http://localhost:5000/rejectBooking", {
            method: "POST",
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
                    setModalTitle("Successful");
                    setModalBody(modalName + " has been rejected successfully.");
                    showToast(3000);
                }
                else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    showToast(3000);

                }
                getBookings();
            });

    }

    function renderCard(i) {
        return (
            <>
                {i.status == "Pending"
                    ?
                    <Card className="text-center my-5">
                        <Card.Header>Pending</Card.Header>
                        <Card.Body>
                            <Card.Title>{i.customerName}</Card.Title>
                            <Card.Text>
                                Customer Email: {i.customerEmail}<br />
                                Customer Number: {i.customerNumber} <br />
                                {i.venueEmail ?
                                    <>
                                        Venue Name: {i.venueName} <br />
                                        Venue Number: {i.venueNumber}<br />
                                        Venue Email: {i.venueEmail}<br />
                                    </>
                                    :
                                    null
                                }
                                {i.serviceEmail ?
                                    <>
                                        Service Name: {i.serviceName}<br />
                                        Service Number: {i.serviceNumber}<br />
                                        Service Email: {i.serviceEmail}<br />
                                    </>
                                    :
                                    null
                                }
                                Date: {new Date(i.date).toLocaleDateString()}<br />
                                Time: {i.time}<br />


                            </Card.Text>
                            <Button variant="primary" onClick={() => acceptModal(i._id, i.customerName)}>Accept</Button> &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => rejectModal(i._id, i.customerName)}>Reject</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">{moment(i.createdAt).fromNow()}</Card.Footer>
                    </Card>
                    :
                    null
                }
            </>
        );
    }

    return (
        <>
            <div class="mt-3 px-3 d-flex justify-content-center" >
                <div class="flex row inform-card my-3 m-5 col-sm-12 col-md-12 col-lg-6">
                    {bookings.length>0 ?
                        <>
                            {bookings.map((i, index) => {
                                return renderCard(i);
                            })}
                        </>
                        :
                        <Card className="text-center my-5">
                            <Card.Header>No data</Card.Header>
                            <Card.Body>
                                <Card.Title>Nothing to show here</Card.Title>
                                <Card.Text>
                                    You have no pending bookings left to verify.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">Nothing here</Card.Footer>
                        </Card>
                    }

                </div>
            
            </div>

            {/*verification for rejecting*/}
            <Modal show={showRejectModal} onHide={() => setshowRejectModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to reject?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to reject <b>{modalName}</b> booking.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowRejectModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => rejectBooking(modalID)}>
                        Reject
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*verification for accepting*/}

            <Modal show={showAcceptModal} onHide={() => setshowAcceptModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to accept?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Have you contacted vendors to make sure they are available for <b>{modalName}</b> Booking?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowAcceptModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => acceptBooking(modalID)}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Toast*/}
            <Toast
                show={show}
                onClose={() => setShow(false)}
                className="position-fixed top-0 end-0 mt-2 me-2"
                animation={true}
            >
                <Toast.Header>
                    <strong className="me-auto">{modalTitle}</strong>
                </Toast.Header>
                <Toast.Body>{modalBody}</Toast.Body>
            </Toast>

        </>
    );
}
