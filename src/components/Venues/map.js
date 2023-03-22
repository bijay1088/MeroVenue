import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';


function MyMap() {
    const [position, setPosition] = useState(null);

    const mapRef = useRef();
    

    useEffect(() => {
        const showMyLocation = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition([position.coords.latitude, position.coords.longitude]);
                mapRef.current.flyTo([position.coords.latitude, position.coords.longitude], mapRef.current.getZoom());
            });
        };
        showMyLocation();
    }, []);

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
            <button onClick={showMyLocation}>Show My Location</button>
            <MapContainer ref={mapRef} center={position || [27.67, 85.30]} zoom={13} style={{ height: '100vh' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position && <Marker position={position} />}
                <MapEvents handleMapClick={handleMapClick} />
            </MapContainer>
        </>
    );
}

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

export default MyMap;
