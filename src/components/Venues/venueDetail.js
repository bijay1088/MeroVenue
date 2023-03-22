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
    MDBCardImage,
    MDBCardTitle,
    MDBRipple,
    MDBIcon,
    MDBBtn,
} from "mdb-react-ui-kit";
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import './venueDetail.css';


function VenueDetail(props) {
    const { id } = useParams();
    const [venue, setVenue] = React.useState({});
    const [position, setPosition] = React.useState(null);
    const mapRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        getVenue();
    }, []);

    const getVenue = () => {
        fetch(`http://localhost:5000/getVenue/${id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setVenue(data.data);
            });
    };

    const booknow = () => {
        const loggedIn = window.localStorage.getItem('loggedIn');
        if (loggedIn) {
            console.log("booked");
        } else {
            const href = window.location.href;
            navigate("/login", { state: { href } });
        }
    }

    return (
        <MDBContainer fluid>
            <MDBRow className="justify-content-center mb-0">
            {Object.keys(venue).length > 0 && (
                    <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md="6" lg="6" className="mb-4 mb-lg-0">
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
                                            alt='Image not loaded.'
                                        />
                                        {venue.image2 ? (
                                            <MDBCarouselItem
                                                className='w-100 d-block'
                                                itemId={2}
                                                src={`http://localhost:5000/${venue.image2}`}
                                                alt='Image not loaded.'
                                            />
                                        ) : null}
                                        {venue.image3 ? (
                                            <MDBCarouselItem
                                                className='w-100 d-block'
                                                itemId={3}
                                                src={`http://localhost:5000/${venue.image3}`}
                                                alt='Image not loaded.'
                                            />
                                        ) : null}
                                    </MDBCarousel>

                                    
                                </MDBCol>
                                <MDBCol md="6">
                                    <div className="mb-4">
                                        <h1>{venue.venueName}</h1>
                                    </div>
                                    
                                    <div className="d-flex flex-row mb-3">
                                        <div className="text-danger mb-1 me-2">
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                        </div>
                                        <span>310</span>
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
                                        
                                        {venue.about }
                                    </p>

                                    <div className="mt-5">
                                        <MDBBtn
                                            className="btn btn-inline-primary btn-rounded btn-md"
                                            size="md"
                                            onClick={booknow}                                        >
                                            Book Now
                                        </MDBBtn>
                                    </div>

                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                )}
                <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3 justify-content-start">

                    {venue.locationCoordinates && (
                        <MapContainer ref={mapRef} center={JSON.parse(venue.locationCoordinates[0])} zoom={13} style={{ height: '500px', width: '600px' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {JSON.parse(venue.locationCoordinates[0]) && <Marker position={JSON.parse(venue.locationCoordinates[0])} />}
                        </MapContainer>
                    )
                    }

                </MDBCard>
                
                
                
            </MDBRow>
            
        </MDBContainer>
    );
}

export default VenueDetail;
