import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


function ToDo() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [remove, setRemove] = useState(false);

    function handleAddTask(){
        setTasks([...tasks, { text: task, done: false }]);
        setTask('');
    };

    useEffect(() => {
        setToDo();
    }, [tasks]);

    function getTodo() {
        fetch("http://localhost:5000/getToDoList", {
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
                if (data.data) {
                    setTasks(data.data);
                }


            })
    }

    function setToDo() {
        if (tasks.length > 0 || remove) {
            fetch("http://localhost:5000/setToDoList", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem("token"),
                    toDoList: tasks
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.data) {
                        setRemove(false);
                    }
                });
        }
    }

    useEffect(() => {
        getTodo();
    }, []);

    

    const handleTaskInput = event => {
        setTask(event.target.value);
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

    function handleTaskDelete(index) {
        setRemove(true);
        setTasks(tasks.filter((task, taskIndex) => taskIndex !== index));
    }

    function handleClearTasks() {
        setRemove(true);
        setTasks([]);
    }



    return (
        <>
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
        </>
    );
}

export default ToDo;
