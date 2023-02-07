import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


function ToDoList() {
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleTaskInput = event => {
        setTask(event.target.value);
    };

    const handleAddTask = () => {
        setTasks([...tasks, { text: task, done: false }]);
        setTask('');
    };

    const handleTaskStatusToggle = index => {
        setTasks(
            tasks.map((task, taskIndex) => {
                if (taskIndex === index) {
                    return { ...task, done: !task.done };
                }
                return task;
            })
        );
    };

    const handleTaskDelete = index => {
        setTasks(tasks.filter((task, taskIndex) => taskIndex !== index));
    };

    const handleClearTasks = () => {
        setTasks([]);
    };

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
                    <Form>
                        <Form.Control
                            type="text"
                            placeholder="Add task"
                            value={task}
                            onChange={handleTaskInput}
                        />
                        <Button className="my-3" variant="primary" onClick={handleAddTask}>
                            Add Task
                        </Button>
                    </Form>
                    <ListGroup className="my-3">
                        {tasks.map((task, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                {!task.done && (
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        onClick={() => handleTaskStatusToggle(index)}
                                    />
                                )}
                                <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                                    &nbsp; &nbsp; 
                                    {task.text}
                                    &nbsp; &nbsp; 
                                </span>
                                
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    onClick={() => handleTaskDelete(index)}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Button variant="danger" onClick={handleClearTasks}>
                        Clear Tasks
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ToDoList;
