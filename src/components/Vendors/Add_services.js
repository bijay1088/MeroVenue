import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBFile,
    MDBIcon
}
    from 'mdb-react-ui-kit';



export default function AddService() {
    const [serviceName, setServiceName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [price, setPrice] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [location, setLocation] = useState('');
    const [position, setPosition] = useState(null);
    const [imageLinks, setImageLinks] = useState('');
    const [image, setImage] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [about, setAbout] = useState('');

    const [serviceNameError, setServiceNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [contactInfoError, setContactInfoError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [imageLinksError, setImageLinksError] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState('');
    let [showModal, setShowModal] = useState(false);
    const mapRef = useRef();

    const navigate = useNavigate();

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
                console.log(data);
                if (data && data.data) { // check if data and data.data are not undefined
                    setUserData(data.data);
                }
            });
        showMyLocation();
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();


        if (!serviceName) {
            setServiceNameError('Service name is required');
            setError('Service name is required');
            return
        } else {
            setServiceNameError('');
            setError('');
        }


        const NumberRegex = /^[0-9]{10}$/;

        if (!contactInfo) {
            setContactInfoError('Contact information is required');
            setError('Contact information is required');
            return;
        } else if (!NumberRegex.test(contactInfo)) {
            setContactInfoError('Contact information must be a 10-digit number');
            setError('Contact information must be a 10-digit number');
            return;
        } else {
            setContactInfoError('');
            setError('');
        }

        const priceRegex = /^\d+(\.\d +)?$/;
        if (!priceRegex.test(price)) {
            setPriceError('Price must be in number');
            setError('Price must be in number');
            return;
        }
        else {
            setPriceError('');
            setError('');
        }

        if (image === "") {
            setError('Set atleast Primary Image')
            return;
        }
        else {
            setError('');
        }

        if (!location) {
            setLocationError('Location is required');
            setError('Location is required');
            return
        } else {
            setLocationError('');
            setError('');
        }


        const formData = new FormData();
        formData.append('serviceName', serviceName);
        formData.append('serviceType', serviceType);
        formData.append('price', price);
        formData.append('email', userData.email);
        formData.append('contactInfo', contactInfo);
        formData.append('location', location);
        formData.append('locationCoordinates', JSON.stringify(position));
        formData.append('image', image);
        formData.append('image2', image2);
        formData.append('image3', image3);
        formData.append('about', about);

        fetch('http://localhost:5000/service', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status == 'success') {
                    setError('');
                    setShowModal(true);
                } else {
                    setError(data.message);
                }
            });
    };


    const options = [
        { value: 'Photography/Videography', label: 'Photography/Videography' },
        { value: 'Photography Only', label: 'Photography Only' },
        { value: 'Videography Only', label: 'Videography Only' },
        { value: 'DJ', label: 'DJ' },
        { value: 'Bands', label: 'Bands' },
        { value: 'Event Manager', label: 'Event Manager' },
        { value: 'Transportation', label: 'Transportation' },
        { value: 'Florist', label: 'Florist' }
    ];

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleImageChange2 = (event) => {
        setImage2(event.target.files[0]);
    };

    const handleImageChange3 = (event) => {
        setImage3(event.target.files[0]);
    };

    const handleMapClick = (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
        console.log(e.latlng.lat, e.latlng.lng);
        mapRef.current.flyTo([e.latlng.lat, e.latlng.lng], mapRef.current.getZoom());
    };

    const showMyLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition([position.coords.latitude, position.coords.longitude]);

            // Fly to the current location
            mapRef.current.flyTo([position.coords.latitude, position.coords.longitude], mapRef.current.getZoom());
        });
    };






    return (
        <>
            {userData.verified ? <></> : navigate("/NotVerified")}


            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol lg='9' className='my-5'>

                        <h3 class="mt-2 mb-4"><a href="/services"><span>Service </span></a> / Add Service</h3>

                        <MDBCard>
                            <MDBCardBody className='px-4'>


                                <MDBRow className='align-items-center pt-2 pb-3 px-4'>
                                    <MDBCol md='12' className='ps-3'>
                                        <h4 className="mb-3">Basic Info</h4>
                                    </MDBCol>

                                    <MDBCol md='6' className='pe-5 pb-3'>
                                        <MDBInput label='Service Name' size='lg' id='serviceName' type='text' value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                                    </MDBCol>

                                    <MDBCol md='6' className='pe-5 pb-3'>
                                        <MDBInput label='Contact Number' size='lg' id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
                                    </MDBCol>

                                    <MDBCol md='3' className='pe-5 pb-3'>
                                        <MDBInput label='Price' size='lg' id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </MDBCol>

                                    <MDBCol md='6' className='pe-4 pb-3'>
                                        <Select
                                            options={options}
                                            value={{ value: serviceType, label: serviceType }}
                                            onChange={(selectedOption) => {
                                                setServiceType(selectedOption.value);
                                            }}
                                            placeholder="Select your Service Category"
                                        />
                                    </MDBCol>

                                </MDBRow>


                                <hr className="mx-n3" />

                                <MDBRow className='align-items-center pt-2 pb-3 px-4'>
                                    <MDBCol md='12' className='ps-3'>
                                        <h4 className="mb-5">Images</h4>
                                    </MDBCol>

                                    <MDBCol md='4' className='pe-5 pb-3'>
                                        <h6 className="mb-0">Primary Image</h6>
                                    </MDBCol>

                                    <MDBCol md='9' className='pe-5 mb-3'>
                                        <MDBFile size='lg' id='customFile' onChange={handleImageChange} />
                                        <div className="small text-muted mt-2">Upload your Primary Images.</div>
                                    </MDBCol>

                                    <MDBCol md='4' className='pe-5 pb-3'>
                                        <h6 className="mb-0">Secondary Image</h6>
                                    </MDBCol>

                                    <MDBCol md='9' className='pe-5 mb-3'>
                                        <MDBFile size='lg' id='customFile' onChange={handleImageChange2} />
                                        <div className="small text-muted mt-2">Upload your Secondary Images.</div>
                                    </MDBCol>

                                    <MDBCol md='9' className='pe-5 mb-3'>
                                        <MDBFile size='lg' id='customFile' onChange={handleImageChange3} />
                                        <div className="small text-muted mt-2">Upload your Secondary Images.</div>
                                    </MDBCol>

                                </MDBRow>

                                <hr className="mx-n3" />

                                <MDBRow className='align-items-center pt-2 pb-3 px-4'>
                                    <MDBCol md='12' className='ps-3'>
                                        <h4 className="mb-3">Location</h4>
                                    </MDBCol>

                                    <MDBCol md='4' className='pe-5 pb-3'>
                                        <MDBInput label='Location' size='lg' id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                    </MDBCol>
                                    <MDBCol md='4' className='pe-5 pb-3'>
                                        <MDBBtn size='md' onClick={showMyLocation}> <MDBIcon fas icon="map-marker-alt me-2" /> Locate me</MDBBtn>
                                    </MDBCol>

                                    <MDBCol md='9' className='pe-5'>
                                        <div className="form-group my-2">

                                            <MapContainer ref={mapRef} center={position || [27.67, 85.30]} zoom={13} style={{ height: '50vh' }}>
                                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                {position && <Marker position={position} />}
                                                <MapEvents handleMapClick={handleMapClick} />
                                            </MapContainer>
                                        </div>
                                    </MDBCol>

                                </MDBRow>

                                <hr className="mx-n3" />

                                <MDBRow className='align-items-center pt-2 pb-3 px-4'>
                                    <MDBCol md='12' className='ps-3'>
                                        <h4 className="mb-5">Additional Information</h4>
                                    </MDBCol>

                                    <MDBCol md='12' className='pe-5 pb-3'>
                                        <MDBTextArea label='About' id="about" value={about} onChange={(e) => setAbout(e.target.value)} rows={5} />
                                    </MDBCol>

                                </MDBRow>


                                <MDBRow className='align-items-center pt-2 pb-3 px-4'>
                                    <div className="error-message"><h6>{error}</h6></div>

                                </MDBRow>


                                <hr className="mx-n3" />

                                <MDBBtn className='my-4' size='lg' onClick={handleSubmit}>send application</MDBBtn>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your service has been created successfully.<br />Thank you for choosing our service.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal></>

    );
};

function MapEvents({ handleMapClick }) {
    const map = useMap();
    useEffect(() => {
        if (map) {
            map.on('click', handleMapClick);
            return () => {
                map.off('click', handleMapClick);
            };
        }
    }, [map, handleMapClick]);
    return null;
}
