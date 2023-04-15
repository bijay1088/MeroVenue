import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import SearchBox from 'react-search-box';
import { Toast } from 'react-bootstrap';

export default function Booking() {

    const [bookings, setBookings] = useState([]);
    let [modalID, setModalID] = useState("");
    let [modalName, setModalName] = useState("");
    let [modalTitle, setModalTitle] = useState("");
    let [modalBody, setModalBody] = useState("");
    let [showRejectModal, setshowRejectModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(null);


    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = () => {
        fetch("http://localhost:5000/getSpecificUserBookings", {
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
                setBookings(data.data);
                console.log(data.data);
            });

    };


    const showToast = (duration) => {
        setShow(true);
        setTimer(setTimeout(() => setShow(false), duration));
    };

    const rejectModal = (id, name) => {
        setModalID(id);
        setModalName(name);
        setshowRejectModal(true);
    }


    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: 'Customer Name',
            selector: 'customerName',
            sortable: true
        },
        {
            name: 'Venue Name',
            selector: 'venueName',
            sortable: true
        },
        {
            name: 'Service Name',
            selector: 'serviceName',
            sortable: true
        },
        {
            name: 'Date',
            selector: (row) => new Date(row.date).toLocaleDateString(),
            sortable: true
        },
        {
            name: 'Time',
            selector: 'time',
            sortable: true
        },
        {
            name: 'Status',
            cell: row => (
                <div>
                    {row.status === "Pending" &&
                        <span className="badge badge-warning" style={{ fontSize: "14px" }}>{row.status}</span> 
                    }
                    {row.status === "Rejected" && 
                        <span className="badge badge-danger " style={{ fontSize: "14px" }}>{row.status}</span>
                    }
                    {row.status === "Cancelled" && 
                        <span className="badge badge-danger " style={{ fontSize: "14px" }}>{row.status}</span>
                    }
                    {row.status === "Accepted" &&
                        <span className="badge badge-success" style={{ fontSize: "14px" }}>{row.status}</span>
                    }
                </div>
            ),
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    {row.status === "Pending" &&
                        <>
                            <button className="btn btn-danger my-1" onClick={() => rejectModal(row._id, row.venueName)}>Cancel</button>
                        </>
                    }
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ];


    const filteredData = bookings.filter(
            (item) =>
                item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.venueName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
    

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const rejectBooking = (id) => {
        setshowRejectModal(false);
        fetch("http://localhost:5000/cancelBooking", {
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
                    setModalBody(modalName + " has been cancelled successfully.");
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

    return (
        <>
            <div className="container" style={{ height: "90vh" }}>
                <div className="row mt-5 mb-3 px-4">
                    <div className="col-lg-6">
                        <h2><a href="/"><span>Home </span></a> / Bookings</h2>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-end">
                        <SearchBox placeholder="Search..." onChange={handleSearch} />
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center col-12 col-md-10 col-lg-12">
                       
                            <div className="table-responsive w-100 table-striped">
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

            {/*verification for rejecting*/}
            <Modal show={showRejectModal} onHide={() => setshowRejectModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to cancel?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to cancel <b>{modalName}</b> booking.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowRejectModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => rejectBooking(modalID)}>
                        Cancel
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

    )

}