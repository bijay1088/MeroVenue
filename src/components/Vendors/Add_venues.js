import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';




export default function AddVenue() {
    const [venueName, setVenueName] = useState('');
    const [venueType, setVenueType] = useState([]);
    const [price, setPrice] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [location, setLocation] = useState('');
    const [position, setPosition] = useState(null);
    const [imageLinks, setImageLinks] = useState('');
    const [image, setImage] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [about, setAbout] = useState('');
    const [capacity, setCapacity] = useState('');

    const [venueNameError, setVenueNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [contactInfoError, setContactInfoError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [imageLinksError, setImageLinksError] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState('');
    let [showModal, setShowModal] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
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


        if (!venueName) {
            setVenueNameError('Venue name is required');
            setError('Venue name is required');
            return
		} else {
            setVenueNameError('');
            setError('');
        } 

        if (venueType.length === 0) {
            setError('Venue cetegory is required');
            return
        } else {
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



        if (!location) {
			setLocationError('Location is required');
            setError('Location is required');
            return
		} else {
			setLocationError('');
			setError('');
        }

        //check if capacity is in number
        if (capacity && isNaN(capacity)) {
            setError('Capacity must be a number');
            return
        } else {
            setError('');
        }



  //      if (venueName && contactInfo && location) {
		//	const venue = {
		//		venueName,
		//		price,
		//		contactInfo,
		//		location,
		//		imageLinks
		//	};

		//	console.log(venue);
		//}

        


        const formData = new FormData();
        formData.append('venueName', venueName);
        formData.append('venueType', JSON.stringify(venueType));
        formData.append('price', price);
        formData.append('email', userData.email);
        formData.append('contactInfo', contactInfo);
        formData.append('location', location);
        formData.append('locationCoordinates', JSON.stringify(position));
        formData.append('image', image);
        formData.append('image2', image2);
        formData.append('image3', image3);
        formData.append('about', about);
        formData.append('capacity', capacity);

        fetch('http://localhost:5000/venue', {
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
            

        <div className="container">
            <h1>Venue Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="venueName">Venue Name</label>
                    <input type="text" className="form-control" id="venueName" value={venueName} onChange={(e) => setVenueName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="venueType">Venue Category</label>
                        <Select
                            isMulti
                            name="venueType"
                            options={options}
                            value={selectedOptions}
                            onChange={(selected) => {
                                setSelectedOptions(selected);
                                setVenueType(selected.map(option => option.value));
                            }}
                            placeholder="Select your venue Category"
                       
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="packageOption1">Price</label>
                        <input type="text" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="packageOption2">Package Option 2</label>*/}
                    {/*    <input type="text" className="form-control" id="packageOption2" value={price[1]} onChange={(e) => handlePackageOptionChange(e, 1)} />*/}
                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="packageOption3">Package Option 3</label>*/}
                    {/*    <input type="text" className="form-control" id="packageOption3" value={price[2]} onChange={(e) => handlePackageOptionChange(e, 2)} />*/}
                    {/*</div>*/}
                    <div className="form-group">
                        <label htmlFor="contactInfo">Contact Information</label>
                        <input type="text" className="form-control" id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Choose location</label>
                        <br/>
                        {/*<div className="mapouter">*/}
                        {/*    <div className="gmap_canvas">*/}
                        {/*        <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=colombo&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <button onClick={showMyLocation}>Locate me</button>
                        <MapContainer ref={mapRef} center={position || [27.67, 85.30]} zoom={13} style={{ height: '50vh' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {position && <Marker position={position} />}
                            <MapEvents handleMapClick={handleMapClick} />
                        </MapContainer>
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" accept="image/*" className="form-control" onChange={handleImageChange}  />
                    </div>
                    <div className="form-group">
                        <label>Extra image</label>
                        <input type="file" accept="image/*" className="form-control mb-3" onChange={handleImageChange2} />
                        <input type="file" accept="image/*" className="form-control" onChange={handleImageChange3} />
                    </div>

                    <div className="form-group">
                        <label>Capacity</label>
                        <input type="text" className="form-control" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label>About</label>
                        <textarea type="text" className="form-control" id="about" value={about} onChange={(e) => setAbout(e.target.value)} required />
                    </div>

                <br/>

                {<div className="error-message">{error}</div>}

                <br/>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>


        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Your venue has been created successfully.<br/>Thank you for choosing our service.</p>
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
