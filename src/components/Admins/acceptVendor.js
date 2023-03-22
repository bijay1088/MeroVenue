import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toast} from 'react-bootstrap';

export default function Vendor() {

    const [vendor, setVendor] = useState([]);
    const [vendorID, setVendorID] = useState("");
    const [kyc, setKYC] = useState([]);
    const [vendorName, setVendorName] = useState("");
    const [showRejectModal, setshowRejectModal] = useState(false);
    const [showAcceptModal, setshowAcceptModal] = useState(false);
    const [showDetailsModal, setshowDetailsModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [verified, setVerified] = useState();
    const [modalID, setModalID] = useState("");
    const [modalName, setModalName] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");

    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        getVendor();
    }, []);

    const getVendor = () => {

        fetch('http://localhost:5000/getVendor', {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setVendor(data.data);
            });

    };

    const showToast = (message, duration) => {
        setShow(true);
        setTimer(setTimeout(() => setShow(false), duration));
    };



    const rejectModal = (id,name) => {
        setModalName(name);
        setModalID(id);
        setshowRejectModal(true);
        setshowDetailsModal(false);


    };

    const rejectVendor = (id, name) => {
        setshowRejectModal(false);


        fetch("http://localhost:5000/unverifyVendor", {
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
                    setModalTitle("Rejection Successful");
                    setModalBody(name + " has been rejected.");
                    showToast(modalBody, 3000);
                        
                }
                else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    setShowModal(true);


                }
                getVendor();
            });


    };

    const acceptModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowAcceptModal(true);
        setshowDetailsModal(false);

    };

    const acceptVendor = (id, name) => {
        setshowAcceptModal(false);

        fetch("http://localhost:5000/verifyVendor", {
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
                    showToast(modalBody, 3000);
                }
                else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    setShowModal(true);
                }
                getVendor();
            });
    };

    const kycModal = (id, verify, name) => {
        setVendorName(name);
        setVerified(verify);
        setVendorID(id);
        setshowDetailsModal(true);
        fetch('http://localhost:5000/getVendorKYC', {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                vendorID: id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setKYC(data.data);
                } else {
                    setModalTitle("Something went wrong");
                    setModalBody(data.message);
                    setShowModal(true);
                }
            });
    };

    const handleFullScreen = (event) => {
        const element = event.target;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };





    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th colSpan={9}><h3>Accept Vendor</h3></th>
                            </tr>
                            <tr>
                                <th>#</th>
                                <th>Vendor Name</th>
                                <th>Email</th>
                                <th>Verified</th>
                                <th>Created At</th>
                                <th>Created Time</th>
                                <th>Details</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendor.map((i, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{i.fname}</td>
                                        <td>{i.email}</td>
                                        <td>{i.verified ? "True" : "False"}</td>
                                        <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                                        <td>{new Date(i.createdAt).toLocaleTimeString()}</td>
                                        <td>
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                onClick={() => { kycModal(i._id, i.verified, i.fname) }}
                                                style={{ cursor: 'pointer'} }
                                            />
                                        </td>
                                        {/*{i.verified ?*/}
                                        {/*    <td><button className="btn btn-danger" onClick={() => rejectModal(i._id, i.fname)}>Reject</button></td>*/}
                                        {/*    :*/}
                                        {/*    <td><button className="btn btn-success" onClick={() => acceptModal(i._id, i.fname)}>Accept</button></td>*/}
                                        {/*}*/}

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
                    <p>Rejecting Vendor will delete <b>{modalName}</b> from database.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowRejectModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => rejectVendor(modalID, modalName)}>
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
                    <p>Accepting Vendor will set <b>{modalName}</b> as verified.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowAcceptModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => acceptVendor(modalID, modalName)}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>


            {/*success modal */}
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

            <Modal show={showDetailsModal} onHide={() => setshowDetailsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Vendor Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {kyc.length === 0 ?
                        (
                            <p>No KYC details found</p>
                        ):(
                            <p>
                                Contact Number: {kyc[0].vendorID}
                                <br /><br />
                                Address: {kyc[0].address}
                                <br /><br />
                                Date of Birth: {new Date((kyc[0].dateOfBirth)).toLocaleTimeString()}
                                <br /><br />
                                {kyc[0].documentType}
                                <br /><br />
                                <picture onClick={handleFullScreen}>
                                    <source srcset={`http://localhost:5000/${kyc[0].documentImage}`} type="image/svg+xml"/>
                                    <img src={`http://localhost:5000/${kyc[0].documentImage}`} class="img-fluid img-thumbnail" alt="..." />
                                 </picture>
                                
                                
                                
                            </p>
                        )
                    }
                    
                </Modal.Body>
                <Modal.Footer>
                    {verified ?
                        <td><button className="btn btn-danger" onClick={() => rejectModal(vendorID, vendorName)}>Reject</button></td>
                        :
                        <td><button className="btn btn-success" onClick={() => acceptModal(vendorID, vendorName)}>Accept</button></td>
                    }
                </Modal.Footer>
                </Modal>


            


        </>

    )

}