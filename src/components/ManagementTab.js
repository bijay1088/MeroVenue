import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import ToDo from "./ToDoList"
import Package from "./Package"

function UncontrolledExample() {
    const [showModal, setShowModal] = useState(false);
    const [key, setKey] = useState('package');
    return (
        <>
            <Button className="ContainerOpened" onClick={() => setShowModal(true)}>
                +
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">To Do List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="package" title="Package">
                            <Package/>
                            
                        </Tab>
                        <Tab eventKey="todo" title="ToDo List">
                            <ToDo />
                        </Tab>
                    </Tabs>
                    
                </Modal.Body>
            </Modal>
        
        </>
    );
}

export default UncontrolledExample;