import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AdminRegistration () {


    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [repassword, setRePassword] = useState("");
    let [error, setError] = useState("");
    let [showModal, setShowModal] = useState(false);
    let role = "Admin";

    const navigate = useNavigate();

    


    const handleSignIn = (e) => {
        e.preventDefault();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!email || !emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Password validation
        if (!password || password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (password !== repassword) {
            setError("Passwords do not match");
            return;
        }

        if (!name) {
            setError("Please enter your name");
            return;
        }

        setError("");

        fetch("http://localhost:5000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                fname: name,
                email: email,
                password: password,
                role: role,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status == "success") {
                    setShowModal(true);
                    //navigate("/");
                } else {
                    setError(data.message);
                }
            });
    };

    


    return (


        <><div className="Admin-Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Add new admin</h3>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="name"
                            className="form-control mt-1"
                            placeholder="e.g Bijay Baniya"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Retype Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Retype Password"
                            value={repassword}
                            onChange={(e) => setRePassword(e.target.value)} />

                    </div>

                    <br />
                    {<div className="error-message">{error}</div>}

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary"
                            onClick={handleSignIn}>
                            Add
                        </button>
                    </div>
                    <br></br>





                </div>
            </form>
        </div><Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your admin account has been created successfully.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal></>



    )

}