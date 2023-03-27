import React from "react";
import { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBRipple,
    MDBBtn,
    MDBInputGroup,
    MDBInput,
} from "mdb-react-ui-kit";
import "./serviceDisplay.css";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Toast } from 'react-bootstrap';

function ServiceDisplay(props) {


    const navigate = useNavigate();
    const [id, setId] = React.useState("");
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(null);
    const [toastTitle, setToastTitle] = React.useState("");
    const [toastBody, setToastBody] = React.useState("");

    function openServicePage(service) {
        setId(service._id);
        console.log(service._id);
        navigate(`/serviceDetail/${service._id}`);
    };

    const showToast = (duration) => {
        setShow(true);
        setTimer(setTimeout(() => setShow(false), duration));
    };

    const options = [
        { value: null, label: 'All' },
        { value: 'Photography/Videography', label: 'Photography/Videography' },
        { value: 'Photography Only', label: 'Photography Only' },
        { value: 'Videography Only', label: 'Videography Only' },
        { value: 'DJ', label: 'DJ' },
        { value: 'Bands', label: 'Bands' },
        { value: 'Event Manager', label: 'Event Manager' },
        { value: 'Transportation', label: 'Transportation' },
        { value: 'Florist', label: 'Florist' }
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    function appPackage(id) {
        const loggedIn = window.localStorage.getItem('loggedIn');
        if (loggedIn) {
            fetch("http://localhost:5000/setPackageService", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem("token"),
                    serviceID: id
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        setToastTitle("Success");
                        setToastBody("This service has been added successfully.");
                        showToast(3000);
                    }
                    else if (data.status == "error") {
                        setToastTitle("Error");
                        setToastBody(data.message);
                        showToast(3000);
                    }
                    else if (data.status == "exist") {
                        setToastTitle("Already Exist");
                        setToastBody(data.message);
                        showToast(3000);
                    }
                });
        } else {
            const href = window.location.href;
            navigate("/login", { state: { href } });
        }

    }


    return (
        <>

            <div className="row justify-content-center mt-3" >
                <div className="col-lg-3 col-md-12 mb-3 d-flex justify-content-center align-items-center">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Category
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {options.map((option) => (
                                <Dropdown.Item
                                    key={option.value}
                                    onClick={() => handleOptionSelect(option.value)}
                                >
                                    {option.label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-lg-3 col-md-12 mb-3 d-flex justify-content-center align-items-center">
                    <MDBInputGroup>
                        <MDBInput label='Search' value={searchTerm} onChange={handleSearch} />
                        <MDBBtn rippleColor='dark'>
                            <MDBIcon icon='search' />
                        </MDBBtn>
                    </MDBInputGroup>
                </div>
            </div>


            

            <MDBContainer fluid>
                <MDBRow className="justify-content-center mb-0">
                    <MDBCol md="12" xl="10">
                        <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="12" xl="10">
                                        {props.services
                                            .filter(service => {
                                                if (searchTerm) {
                                                    if (selectedOption) {
                                                        return service.serviceType.includes(selectedOption) && service.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
                                                    }
                                                    else {
                                                        return service.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
                                                    }
                                                }
                                                else if (selectedOption) {
                                                    return service.serviceType.includes(selectedOption);


                                                } else {
                                                    return true;
                                                }
                                            }).map((service, index) => (
                                            <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                                                <MDBCardBody>
                                                    <MDBRow>
                                                        <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                                            <MDBRipple
                                                                rippleColor="light"
                                                                rippleTag="div"
                                                                className="bg-image rounded hover-zoom hover-overlay"
                                                            >
                                                                <MDBCardImage
                                                                    src={`http://localhost:5000/${service.image}` }
                                                                    className="w-100 card-image d-flex justify-content-center align-items-center"
                                                                />
                                                                <a onClick={() => openServicePage(service)}>
                                                                    <div
                                                                        className="mask"
                                                                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                                    ></div>
                                                                </a>
                                                            </MDBRipple>
                                                        </MDBCol>
                                                        <MDBCol md="6">
                                                            <h5>{service.serviceName}</h5>
                                                            <div className="d-flex flex-row">
                                                                <div className="text-danger mb-1 me-2">
                                                                    <MDBIcon fas icon="star" />
                                                                    <MDBIcon fas icon="star" />
                                                                    <MDBIcon fas icon="star" />
                                                                    <MDBIcon fas icon="star" />
                                                                </div>
                                                                <span></span>
                                                            </div>
                                                            <div className="mb-2 text-muted small">
                                                                <MDBIcon fas icon="tag" />
                                                                <span>&nbsp; </span>
                                                                {service.serviceType}
                                                                <span>
                                                                    <br />
                                                                </span>
                                                            </div>
                                                            <p className="text-truncate mb-4 mb-md-0">
                                                                {service.about }
                                                            </p>
                                                        </MDBCol>
                                                        <MDBCol
                                                            md="6"
                                                            lg="3"
                                                            className="border-sm-start-none border-start"
                                                        >
                                                            <div className="d-flex flex-row align-items-center mb-1">
                                                                <h4 className="mb-1 me-1">NPR {service.price}</h4>
                                                            </div>
                                                            <div className="d-flex flex-column mt-4" >
                                                                <MDBBtn color="primary" size="sm" onClick={() => openServicePage(service)}>
                                                                    Details
                                                                </MDBBtn>
                                                                <MDBBtn outline color="primary" size="sm" className="mt-2" onClick={() => appPackage(service._id)}>
                                                                    Add to package
                                                                </MDBBtn>
                                                            </div>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCardBody>
                                            </MDBCard>
                                        ))}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>  
                </MDBRow>    
            </MDBContainer>

            <Toast
                show={show}
                onClose={() => setShow(false)}
                className="position-fixed top-0 end-0 mt-2 me-2"
                animation={true}
            >
                <Toast.Header>
                    <strong className="me-auto">{toastTitle}</strong>
                </Toast.Header>
                <Toast.Body>{toastBody}</Toast.Body>
            </Toast>

        </>
    );
            
}

export default ServiceDisplay;