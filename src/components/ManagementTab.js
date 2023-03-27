import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import ToDo from "./ToDoList"
import Package from "./Package"

function Manager() {
    const loggedIn = window.localStorage.getItem('loggedIn');
    const [showModal, setShowModal] = useState(false);
    const [key, setKey] = useState('package');
    return (
        <>
            <Button className="ContainerOpened" onClick={() => setShowModal(true)}>
                <span className="IconContainer">
                    <i class="fa-solid fa-user-tie"></i>
                </span>
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Management Tool</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {loggedIn ?
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="package" title="Package">
                                <Package />

                            </Tab>
                            <Tab eventKey="todo" title="ToDo List">
                                <ToDo />
                            </Tab>
                        </Tabs>
                        : <p>You don't seem to be logged in right now. <br /><br />Please <a href="/login"><strong>Log in</strong></a> to use this feature</p>}
                    
                </Modal.Body>
            </Modal>
        
        </>
    );
}

export default Manager;