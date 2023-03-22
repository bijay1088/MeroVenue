import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Link } from "react-router-dom";

export default function KYCForm() {

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [documentType, setDocumentType] = useState("Citizenship");
    const [documentImage, setDocumentImage] = useState("");
    const [tos, setTos] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/user", {
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
                if (data && data.data) { // check if data and data.data are not undefined
                    setUserId(data.data._id);
                    setName(data.data.name);
                    setEmail(data.data.email);
                }
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();


        //check if contact number is in number or not
        if (isNaN(contactNumber)) {
            setError("Please enter a valid contact number");
            return;
        }

        //check if address is empty or not
        if (!address) {
            setError("Please enter your address");
            return;
        }

        //check if dob is empty or not
        if (!dob) {
            setError("Please enter your date of birth");
            return;
        }

        //check if document image is empty or not
        if (!documentImage || !documentImage.name) {
            setError("Please upload your document image");
            return;
        }

        if (tos == false) {
            setError("Please accept the terms and conditions");
            return;
        }


        setError("");

        const formData = new FormData();
        formData.append("vendorID", userId);
        formData.append("contactNumber", contactNumber);
        formData.append("dateOfBirth", dob);
        formData.append("address", address);
        formData.append("documentType", documentType);
        formData.append("tOS", tos);
        formData.append("documentImage", documentImage);
        console.log(formData)

        fetch('http://localhost:5000/kyc', {
            method: 'POST',
            
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status == 'success') {
                    setError('');
                } else {
                    setError(data.message);
                }
            });


        
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setDocumentImage(file);
    }

    const handleTos = () => {
        setTos(!tos);
        setShowModal(false);
    }



    return (
        <>
        <div className="KYC-Auth-form-container">
            <form className="Auth-form" enctype="multipart/form-data">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">KYC Form</h3>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="name"
                            className="form-control mt-1"
                            placeholder="e.g Bijay Baniya"
                            value={name}
                            disabled={true }/>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            value={email}
                            disabled={true} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Contact Number</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="9xxxxxxxxx"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)} />
                    </div>
                    <div className="form-group mt-3 col-md-6">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            className="form-control mt-1"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Lalitpur, Imadol"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="form-group mt-3">
                        <label>Document Type</label>
                        <select
                            className="form-control mt-1"
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}>
                            <option value="Citizenship">Citizensip</option>
                            <option value="Passport">Passport</option>
                            <option value="Driving License">Driving License</option>
                        </select>
                    </div>

                    <div className="form-group mt-3">
                        <label>Document Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control mt-1"
                            onChange={handleImageChange}
                            />
                    </div>

                    <div className="form-check mt-3">
                        <input 
                            type="checkbox"
                            className="form-check-input"
                            value={tos}
                            checked={tos}
                            onChange={(e) => setTos(e.target.checked)} />
                        <label>
                                I agree to the&nbsp;
                                <span
                                    onClick={() => setShowModal(true)}
                                    style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                                >
                                    terms and conditions
                                </span>
                            </label>
                    </div>

                    {<div className="error-message mt-3">{error}</div>}
                    <div className="d-grid gap-2 mt-5 mb-3">
                        <button type="submit" className="btn btn-primary"
                            onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>


                </div>
            </form>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Terms and Condition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <p>
                        By submitting this KYC application, I confirm that all the information provided above is accurate and true to the best of my knowledge. I understand that any false or misleading information provided may result in the rejection of my application and/or termination of my account. I also understand that my personal information will be collected, stored, and processed in accordance with the company's privacy policy.<br/><br/>

                        I acknowledge that the MeroVenue is not liable for any loss, damages, or expenses that may arise from any inaccurate, incomplete, or false information provided by me. I agree to indemnify and hold harmless the company, its directors, officers, employees, and agents from any claims, liabilities, damages, or expenses arising from any breach of this agreement.<br/><br/>

                        By submitting this application, I signify my acceptance of these terms and conditions.
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => handleTos()}>
                {tos ? "I Disagree" : "I Agree"}
            </Button>
        </Modal.Footer>
    </Modal>
        </>
    )
}