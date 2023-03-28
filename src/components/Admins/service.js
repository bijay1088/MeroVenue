import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import SearchBox from 'react-search-box';

export default function Service() {

    const [Service, setService] = useState([]);
    let [showRejectModal, setshowRejectModal] = useState(false);
    let [showAcceptModal, setshowAcceptModal] = useState(false);
    let [showModal, setShowModal] = useState(false);
    let [modalID, setModalID] = useState("");
    let [modalName, setModalName] = useState("");
    let [modalTitle, setModalTitle] = useState("");
    let [modalBody, setModalBody] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

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

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: 'Service Name',
            selector: 'serviceName',
            sortable: true
        },
        {
            name: 'Type',
            selector: 'serviceType',
            sortable: true
        },
        {
            name: 'Address',
            selector: 'location',
            sortable: true
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true
        },
        {
            name: 'Phone Number',
            selector: 'contactInfo',
            sortable: true
        },
        {
            name: 'Created At',
            selector: 'createdAt',
            sortable: true,
            format: row => new Date(row.createdAt).toLocaleDateString()
        },
        {
            name: 'Created Time',
            selector: 'createdAt',
            sortable: true,
            format: row => new Date(row.createdAt).toLocaleTimeString()
        }
    ];

    const filteredData = Service.filter(
        (item) =>
            item.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.contactInfo.includes(searchQuery)
    );

    const handleSearch = (query) => {
        setSearchQuery(query);
    };


    return (
        <>
            <div className="d-flex justify-content-center my-2">
                <h2>Services</h2>

            </div>
            <div className="container" style={{ height: "100vh" }}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-12">
                        <div className="my-2 col-lg-6 d-flex justify-content-center">
                            <SearchBox placeholder="Search..." onChange={handleSearch} />
                        </div>
                        <div className="table-responsive">
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                pagination={true}
                                highlightOnHover={true}
                                striped={true}
                            />
                        </div>
                    </div>
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