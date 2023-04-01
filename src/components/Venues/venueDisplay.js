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
import "./venueDisplay.css"
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Toast } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';

function VenueDisplay(props) {
    const isVendor = window.localStorage.getItem('isVendor');
    const navigate = useNavigate();
    const [id, setId] = React.useState("");
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(null);
    const [toastTitle, setToastTitle] = React.useState("");
    const [toastBody, setToastBody] = React.useState("");
    function openVenuePage(venue) {
        setId(venue._id);
        console.log(venue._id);
        navigate(`/venueDetail/${venue._id}`);
    };

    const showToast = (duration) => {
        setShow(true);
        setTimer(setTimeout(() => setShow(false), duration));
    };

    function appPackage(id) {
        const loggedIn = window.localStorage.getItem('loggedIn');
        if (loggedIn) {
            fetch("http://localhost:5000/setPackageVenue", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem("token"),
                    venueID: id
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "active") {
                        setToastTitle("Exisitng Venue");
                        setToastBody("You have already added venue to list.");
                        showToast(5000);
                    }
                    else if (data.status == "success") {
                        setToastTitle("Success");
                        setToastBody("Venue has been added successfully.");
                        showToast(3000);
                    }
                    else if (data.status == "error") {
                        setToastTitle("Error");
                        setToastBody(data.message);
                        showToast(3000);
                    }
                });
        } else {
            const href = window.location.href;
            navigate("/login", { state: { href } });
        }

    }

    const options = [
        { value: null, label: 'All' },
        { value: 'Wedding', label: 'Wedding' },
        { value: 'Birthday', label: 'Birthday' },
        { value: 'Corporate events', label: 'Corporate Event' },
        { value: 'Concert', label: 'Concert' },
        { value: 'Conference', label: 'Conference' },
        { value: 'Exhibition', label: 'Exhibition' },
        { value: 'Festival', label: 'Festival' },
        { value: 'Meeting', label: 'Meeting' },
        { value: 'Party', label: 'Party' },
        { value: 'Seminar', label: 'Seminar' },
        { value: 'Trade show', label: 'Trade show' },
        { value: 'Sport', label: 'Sport' },
        { value: 'Indoor Event', label: 'Indoor Event' },
        { value: 'Outdoor Event', label: 'Outdoor Event' },
        { value: 'Religious Event', label: 'Religious Event' },
        { value: 'Family Gathering', label: 'Family Gathering' },
        { value: 'Cafe', label: 'Cafe' },
        { value: 'Other', label: 'Other' }
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <>   

            <MDBContainer fluid>
                <MDBRow className="justify-content-center mb-2">
                    <MDBCol md="12" xl="10" >
                        <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3" >
                            <div className="row justify-content-center mt-3" >
                                <div className="col-lg-3 col-md-6 col-sm-6 mb-3 d-flex justify-content-center align-items-center">
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
                                <div className="col-lg-3 col-md-6 col-sm-6 mb-3 d-flex justify-content-center align-items-center">
                                    <MDBInputGroup>
                                        <MDBInput label='Search' value={searchTerm} onChange={handleSearch} />
                                        <MDBBtn rippleColor='dark'>
                                            <MDBIcon icon='search' />
                                        </MDBBtn>
                                    </MDBInputGroup>
                                </div>
                            </div>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="12" xl="10">
                                        {props.venues
                                            .filter(venue => {
                                                if (searchTerm) {
                                                    if (selectedOption) {
                                                        return JSON.parse(venue.venueType).includes(selectedOption) && venue.venueName.toLowerCase().includes(searchTerm.toLowerCase());
                                                    }
                                                    else {
                                                        return venue.venueName.toLowerCase().includes(searchTerm.toLowerCase());
                                                    }
                                                }
                                                else if (selectedOption) {
                                                    return JSON.parse(venue.venueType).includes(selectedOption);
                                                
                                                    
                                                } else {
                                                    return true;
                                                }
                                            }).map((venue, index) => (
                                                <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3" key={index}>
                                                <MDBCardBody>
                                                    <MDBRow>
                                                        <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                                            <MDBRipple
                                                                rippleColor="light"
                                                                rippleTag="div"
                                                                className="bg-image rounded hover-zoom hover-overlay"
                                                            >
                                                                <MDBCardImage
                                                                        src={`http://localhost:5000/${venue.image}`}
                                                                        top="true"
                                                                    className="w-100 card-image d-flex justify-content-center align-items-center"
                                                                />
                                                                <a onClick={() => openVenuePage(venue)}>
                                                                    <div
                                                                        className="mask"
                                                                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                                    ></div>
                                                                </a>
                                                            </MDBRipple>
                                                        </MDBCol>
                                                        <MDBCol md="6">
                                                            <h5>{venue.venueName}</h5>
                                                                <div className="d-flex flex-row align-items-center mb-3">
                                                                    <div className="text-danger mb-1 me-2">
                                                                        <Rating
                                                                            count={5}
                                                                            value={venue.avgRating}
                                                                            size={30}
                                                                            activeColor="#ffd700"
                                                                            edit={false}
                                                                        />
                                                                    </div>
                                                                    <span className="my-3">{venue.avgRating}</span>
                                                                </div>
                                                            <div className="mb-2 text-muted small">
                                                                <MDBIcon fas icon="person" />
                                                                <span>&nbsp; {venue.capacity}</span>
                                                            </div>
                                                            <div className="mb-2 text-muted small">
                                                                <MDBIcon fas icon="tag" />
                                                                <span>&nbsp; </span>
                                                                {JSON.parse(venue.venueType).join(", ")}
                                                                <span>
                                                                    <br />
                                                                </span>
                                                            </div>
                                                            <p className="text-truncate mb-4 mb-md-0">
                                                                {venue.about }
                                                            </p>
                                                        </MDBCol>
                                                        <MDBCol
                                                            md="6"
                                                            lg="3"
                                                            className="border-sm-start-none border-start"
                                                        >
                                                            <div className="d-flex flex-row align-items-center mb-1">
                                                                {/*{JSON.parse(venue.price).map((type) => (*/}
                                                                {/*    <h4 className="mb-1 me-1">NPR {type} &nbsp;</h4>*/}
                                                                {/*))}*/}
                                                                <h4 className="mb-1 me-1">NPR {venue.price}</h4>
                                                                {/*<h4 className="mb-1 me-1">$13.99</h4>*/}
                                                                {/*<span className="text-danger">*/}
                                                                {/*    <s>$20.99</s>*/}
                                                                {/*</span>*/}
                                                            </div>
                                                            {/*<h6 className="text-success">Free shipping</h6>*/}
                                                            <div className="d-flex flex-column mt-4" >
                                                                <MDBBtn color="primary" size="sm" onClick={() => openVenuePage(venue)}>
                                                                    Details
                                                                    </MDBBtn>
                                                                    {isVendor ? null : (
                                                                        <MDBBtn outline color="primary" size="sm" className="mt-2" onClick={() => appPackage(venue._id)}>
                                                                            Add to package
                                                                        </MDBBtn>
                                                                    )}
                                                                
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

export default VenueDisplay;