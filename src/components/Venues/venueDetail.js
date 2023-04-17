import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
} from "mdb-react-ui-kit";
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import './venueDetail.css';
import { Toast } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Rating from 'react-rating-stars-component';
import Empty from "../../images/empty.gif";
import Loading from "../../images/loading.gif";
import stripe from 'stripe';


function VenueDetail(props) {
    const loggedIn = window.localStorage.getItem('loggedIn');
    const isVendor = window.localStorage.getItem('isVendor');
    const { id } = useParams();
    const [venue, setVenue] = React.useState({});
    const [position, setPosition] = React.useState(null);
    const mapRef = useRef();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(null);
    const [toastTitle, setToastTitle] = React.useState("");
    const [toastBody, setToastBody] = React.useState("");
    const [modalID, setModalID] = useState("");
    const [modalName, setModalName] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [showBookModal, setshowBookModal] = useState(false);
    const [number, setNumber] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [noNumber, setNoNumber] = useState(true);
    const [error, setError] = useState("");
    const [customer, setCustomer] = useState("");
    const [showReviewModal, setShowReviewModal] = useState("");
    const [reviewSubject, setReviewSubject] = useState("");
    const [reviewDesc, setReviewDesc] = useState("");
    const [review, setReview] = useState([]);
    const moment = require('moment');
    const stripeInstance = stripe('sk_test_51Mx9mAJmZ9RFfL2ZuWxc0zZHiG1cPoLT0R5ZjV6DN7mWWoUCxvtIdrfaydyPoUaZ656eZ6lLEdK0lXCH0aCu8arG00Dv98JhSS');


    useEffect(() => {
        getVenue();
    }, []);

    

    const handleRatingChange = (newRating) => {
        if (loggedIn) {
            
            fetch("http://localhost:5000/addRating", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem("token"),
                    venueID: id,
                    serviceID: null,
                    rating: newRating
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        getVenue();
                        console.log(data.data);

                    }
                    else if (data.status == "error") {
                        console.log(data.message)
                    }
                });

        }
        else {
            const href = window.location.href;
            navigate("/login", { state: { href } });

        }

    };

    const getVenue = () => {
        fetch(`http://localhost:5000/getVenue/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setVenue(data.data);
                getReview();
            });
    };

    const getReview=()=>{
        fetch(`http://localhost:5000/getReview/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "success") {
                    setReview(data.data);
                }
                else if (data.status == "error") {
                    console.log(data.message);
                }
                
            });
    };


    const booknow = () => {

        if (isNaN(number)) {
            setError("Please enter a valid contact number");
            return;
        }

        //check if address is empty or not
        if (!date) {
            setError("Please enter date");
            return;
        }

        if (!time) {
            setError("Please enter time")
            return;
        }


        if (noNumber) {
            fetch("http://localhost:5000/setUserPhoneNumber", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem("token"),
                    phoneNumber: number

                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        console.log("Number added")
                        console.log(number);
                        setError("");
                    }
                    else if (data.status == "error") {
                        setError(data.data);
                    }
                });

        }

        fetch("http://localhost:5000/user", {
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
                if (data.status == "success") {
                    setCustomer(data.data);
                }
                else {
                    setToastTitle("Error");
                    setToastBody(data.message);
                    showToast(3000);
                }
            });


        fetch("http://localhost:5000/bookings", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                venueID: id,
                serviceID: null,
                date: date,
                time: time
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "success") {
                    setshowBookModal(false);
                    setToastTitle("Successful");
                    setToastBody("Venue has been booked successfully.");
                    showToast(3000);

                }
                else if (data.status == "error") {
                    setError(data.data);
                }
            });


        const payment = {
            "return_url": "http://localhost:3000/",
            "website_url": "http://localhost:3000/",
            "amount": 1000,
            "purchase_order_id": 1,
            "purchase_order_name": "Order 1",
            // "customer_info": {
            //    "name": customer.fname,
            //    "email": customer.email,
            //    "phone": number
            // },
            // "amount_breakdown": [
            //    {
            //        "label": "Total Price",
            //        "amount": venue.price
            //    }
            // ],
            // "product_details": [
            //    {
            //        "identity": venue._id,
            //        "name": venue.name,
            //        "total_price": venue.price,
            //        "quantity": 1,
            //        "unit_price": venue.price
            //    }
            // ]

            // "public_key": "test_public_key_ab8c77b186e0452f97d609396c18f85e",
            // "mobile": number,
            // "transaction_pin": "1234",
            // "amount": venue.price*100,
            // "product_identity": "book/id-120",
            // "product_name": "A Song of Ice and Fire",
            // "product_url": "http://bookexample.com"
        }

        const config = "744e7c5a240f401e95551a71d782da81";
        const href = window.location.href;

        fetch("https://a.khalti.com/api/v2/epayment/initiate/", {
            method: "POST",
            headers: {
                "Authorization": "Key " + config,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "return_url": href,
                    "website_url": "http://localhost:3000/",
                    "amount": 1000  * 100,
                    "purchase_order_id": 1,
                    "purchase_order_name": "Order 1",
                }
                )
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                window.location.href = data.payment_url;
            })
            .catch((error) => {
                console.error(error);
        });



    }

    const showToast = (duration) => {
        setShow(true);
        setTimer(setTimeout(() => setShow(false), duration));
    };

    function showModal() {
        const loggedIn = window.localStorage.getItem('loggedIn');
        if (loggedIn) {
            fetch("http://localhost:5000/getUserPhoneNumber", {
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
                    if (data.status == "success") {
                        console.log(data.data);
                        if (data.data == undefined || data.data == "") {
                            setNumber("");
                            setNoNumber(true);
                        }
                        else {
                            setNoNumber(false);
                            setNumber(data.data);
                        }
                        
                        setshowBookModal(true);
                    }
                    else if (data.status == "error") {
                        console.log(data.data);
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



    function appPackage() {
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

    function addReview(){

        if (!reviewSubject) {
            setError("Please enter subject");
            return;
        }

        if (!reviewDesc) {
            setError("Please enter description")
            return;
        }

        fetch("http://localhost:5000/addReview", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    token: window.localStorage.getItem("token"),
                    productID: id,
                    reviewSubject,
                    reviewDesc
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        setToastTitle("Successful");
                        setToastBody("Review has been added successfully.");
                        showToast(5000);
                        getReview();
                    }
                    else if (data.status == "error") {
                        setToastTitle("Error");
                        setToastBody(data.message);
                        showToast(3000);
                    }
                });
        setShowReviewModal(false);
    }
    

    return (
        <>
        <MDBContainer fluid>
                <MDBRow className="justify-content-center mb-0" >
                    <MDBCol md="12" xl="10" >
                        {Object.keys(venue).length > 0 && (
                            <><h3 class="mt-4 ms-6"><a href="/venues"><span>Venue </span></a> / {venue.venueName}</h3>

                                <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol md="6" lg="6" className="mb-4 mb-lg-0" >
                                                {/*<MDBRipple*/}
                                                {/*    rippleColor="light"*/}
                                                {/*    rippleTag="div"*/}
                                                {/*    className="bg-image rounded hover-zoom hover-overlay"*/}
                                                {/*>*/}
                                                {/*    <MDBCardImage*/}
                                                {/*        src={`http://localhost:5000/${venue.image}`}*/}
                                                {/*        fluid*/}
                                                {/*        className="w-100"*/}
                                                {/*    />*/}
                                                {/*    <a href="#!">*/}
                                                {/*        <div*/}
                                                {/*            className="mask"*/}
                                                {/*            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}*/}
                                                {/*        ></div>*/}
                                                {/*    </a>*/}
                                                {/*</MDBRipple>*/}
                                                <MDBCarousel showControls showIndicators>
                                                    <MDBCarouselItem
                                                        className='w-100 d-block'
                                                        itemId={1}
                                                        src={`http://localhost:5000/${venue.image}`}
                                                        alt='Image not loaded.' />
                                                    {venue.image2 ? (
                                                        <MDBCarouselItem
                                                            className='w-100 d-block'
                                                            itemId={2}
                                                            src={`http://localhost:5000/${venue.image2}`}
                                                            alt='Image not loaded.' />
                                                    ) : null}
                                                    {venue.image3 ? (
                                                        <MDBCarouselItem
                                                            className='w-100 d-block'
                                                            itemId={3}
                                                            src={`http://localhost:5000/${venue.image3}`}
                                                            alt='Image not loaded.' />
                                                    ) : null}
                                                </MDBCarousel>


                                            </MDBCol>
                                            <MDBCol md="6" className="bg-light px-4 py-4">
                                                <div className="mb-4">
                                                    <h1>{venue.venueName}</h1>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-3">
                                                    <div className="text-danger mb-1 me-2">
                                                        <Rating
                                                            count={5}
                                                            value={venue.avgRating}
                                                            onChange={handleRatingChange}
                                                            size={30}
                                                            activeColor="#ffd700" />
                                                    </div>
                                                    <span className="my-3">{venue.avgRating}</span>
                                                </div>

                                                <div className="mb-3" size="5">
                                                    <strong>Capacity:  </strong>
                                                    <MDBIcon fas icon="person" />
                                                    <span>&nbsp; {venue.capacity}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <strong>Category:  </strong>
                                                    <MDBIcon fas icon="tag" />
                                                    <span>&nbsp; </span>
                                                    {JSON.parse(venue.venueType).join(", ")}
                                                </div>
                                                <div className="mb-3">
                                                    <strong>Address:  </strong>
                                                    <MDBIcon fas icon="map-marker-alt" />
                                                    <span>&nbsp; {venue.location}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <strong>Phone:  </strong>
                                                    <MDBIcon fas icon="phone" />
                                                    <span>&nbsp; {venue.contactInfo}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <strong>Email:  </strong>
                                                    <MDBIcon fas icon="envelope" />
                                                    <span>&nbsp; {venue.email}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <strong>Price:  </strong>
                                                    <MDBIcon fas icon="money-bill" />
                                                    <span>&nbsp; {venue.price}</span>
                                                </div>
                                                <p className="mb-4 mb-md-0 mt-5">
                                                    <h4>
                                                        About &nbsp;
                                                        <MDBIcon fas icon="info-circle" />
                                                    </h4>

                                                    {venue.about}
                                                </p>
                                                {isVendor ? null : (
                                                    <div className="mt-5">
                                                        <MDBBtn
                                                            className="btn btn-inline-primary btn-rounded btn-md mt-2"
                                                            size="md"
                                                            onClick={showModal}>
                                                            Book Now
                                                        </MDBBtn>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <MDBBtn
                                                            className="btn btn-inline-secondary btn-rounded btn-md mt-2"
                                                            size="md"
                                                            onClick={appPackage}>
                                                            Add to Package
                                                        </MDBBtn>
                                                        &nbsp;&nbsp;&nbsp;
                                                        {loggedIn ? (
                                                            <MDBBtn
                                                                className="btn btn-inline-secondary btn-rounded btn-md mt-2"
                                                                size="md"
                                                                onClick={() => setShowReviewModal(true)}>
                                                                Add Review
                                                            </MDBBtn>
                                                        ): null}    
                                                        
                                                    </div>
                                                )}


                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard></>

                        )}
                        <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3 justify-content-start">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="6" lg="6" className="mb-4 mb-lg-0" >
                                        {venue.locationCoordinates && (
                                        <MapContainer ref={mapRef} center={JSON.parse(venue.locationCoordinates[0])} zoom={13} style={{ height: '60vh'}}>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            {JSON.parse(venue.locationCoordinates[0]) && <Marker position={JSON.parse(venue.locationCoordinates[0])} />}
                                        </MapContainer>
                                    )}
                                    </MDBCol>
                                    <MDBCol md="6" lg="6" className="mb-4 mb-lg-0" >
                                    <div class="review-block">
                                        {review.length>0 ? 
                                        (
                                            <>
                                                {review.map((review) => (
                                                    <>
                                                    <div className="row m-2">
                                                        <div className="col-sm-3">
                                                            <div className="review-block-name"><a href="#">{review.fname}</a></div>
                                                            <div className="review-block-date">
                                                                {moment(review.createdAt).format('MMMM D, YYYY')}
                                                                <br/>
                                                                {moment(review.createdAt).fromNow()}
                                                            </div>
        
                                                        </div>
                                                        <div className="col-sm-9">
                                                            <div className="review-block-title">{review.reviewSubject}</div>
                                                            <div className="review-block-description">{review.reviewDesc}</div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    </>
                                                ))}
                                            </>
                                        )
                                         : (
                                            <div style={{ height: '60vh', textAlign: 'center', backgroundImage: `url(${Loading})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'auto 40%'}}>
                                                <h3>No Reviews</h3>
                                            </div>
                                         
                                         )}
                                        
                                        
                                    </div>
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


            <Modal show={showBookModal} onHide={() => setshowBookModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Now</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!noNumber ? null : <div className="form-group mt-3 col-md-9">
                        <label>Contact Number</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="9xxxxxxxxx"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        </div>
                    }
                        
                    
                    <div className="form-group mt-3 col-md-6">
                        <label>Date</label>
                        <input
                            type="date"
                            className="form-control mt-1"
                            value={date}
                            onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className="form-group mt-3 col-md-6">
                        <label>Time</label>
                        <input
                            type="time"
                            className="form-control mt-1"
                            value={time}
                            onChange={(e) => setTime(e.target.value)} />
                    </div>
                    {<div className="error-message mt-3">{error}</div>}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setshowBookModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => booknow()}>
                        Book
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showReviewModal} onHide={()=>setShowReviewModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    
                    <div className="form-group mt-3 col-md-12">
                        <label>Subject</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            value={reviewSubject}
                            onChange={(e) => setReviewSubject(e.target.value)} />
                    </div>

                    <div className="form-group mt-3 col-md-12">
                        <label>Review</label>
                        <textarea
                            type="text"
                            className="form-control mt-1"
                            value={reviewDesc}
                            onChange={(e) => setReviewDesc(e.target.value)}
                            rows={4} />
                    </div>
                    {<div className="error-message mt-3">{error}</div>}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-secondary" onClick={() => setShowReviewModal(false)}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => addReview()}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

       
        </>
    );
}

export default VenueDetail;
