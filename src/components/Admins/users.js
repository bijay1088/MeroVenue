import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import SearchBox from 'react-search-box';

export default function Users() {

    const [users, setUsers] = useState([]);
    let [showDeleteModal, setshowDeleteModal] = useState(false);
    let [showModal, setShowModal] = useState(false);
    let [modalID, setModalID] = useState("");
    let [modalName, setModalName] = useState("");
    let [modalTitle, setModalTitle] = useState("");
    let [modalBody, setModalBody] = useState("");
    let [ showbanModal, setshowBanModal ] = useState(false);
    let [showunbanModal, setshowUnbanModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {

        fetch('http://localhost:5000/getAllUsers', {
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
                console.log(data);
                setUsers(data.data);
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
                getUsers();
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
                getUsers();
            });
    };


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
                getUsers();
            });
    };

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: 'Name',
            selector: 'fname',
            sortable: true
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true
        },
        {
            name: 'Role',
            selector: 'role',
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
        },
        {
            name: 'Banned Status',
            selector: 'banStatus',
            sortable: true,
            format: row => row.banStatus ? 'Banned' : 'Not Banned'
        },
        {
            cell: row => row.role !== 'Admin' && (
                row.banStatus ? (
                    <button className="btn btn-primary" onClick={() => unbanModal(row._id, row.fname)}>UnBan</button>
                ) : (
                    <button className="btn btn-primary" onClick={() => banModal(row._id, row.fname)}>Ban</button>
                )
            )
        },
        {
            cell: row => row.role !== 'Admin' && (
                <button className="btn btn-danger" onClick={() => deleteModal(row._id, row.fname)}>Delete</button>
            )
        }
    ];

    const filteredData = users.filter(
        (item) =>
            item.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query) => {
        setSearchQuery(query);
    };




    return (
        <>
            <div className="d-flex justify-content-center my-2">
                <h2>Users</h2>

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

            {/*unbanninng  users*/}
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