import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import NavBar from "./components/NavBar"
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from "./components/Login"
import Register from "./components/registerform"
import Home from "./components/home"
import Contact from "./components/contact"
import Footer from "./components/footer"
import ManagementTab from "./components/ManagementTab"
import NotFoundPage from "./components/Error"
import Bookings from "./components/Bookings"

import Venues from "./components/Venues/venues"
import VenueDetail from "./components/Venues/venueDetail"
import Map from "./components/Venues/map"

import Services from "./components/Services/services"
import ServiceDetail from "./components/Services/serviceDetail"

import AdminBar from "./components/Admins/adminPanel"
import Admin from "./components/Admins/admin"
import Venue from "./components/Admins/venue"
import Users from "./components/Admins/users"
import Service from "./components/Admins/service"
import AcceptVendor from "./components/Admins/acceptVendor"
import Booking from "./components/Admins/booking"
import PendingBooking from "./components/Admins/pendingBooking"
import Dashboard from "./components/Admins/dashboard"

import AddVenue from "./components/Vendors/Add_venues"
import NotVerified from "./components/Vendors/notVerified"
import KYCForm from "./components/Vendors/kyc"
import AddService from "./components/Vendors/Add_services"



function App() {
    const loggedIn = window.localStorage.getItem('loggedIn');
    const isAdmin = window.localStorage.getItem('isAdmin');
    const isVendor = window.localStorage.getItem('isVendor');
    const isCustomer = !(isAdmin || isVendor);

    return (
        <>
            <BrowserRouter>
                {isAdmin ? (
                    <AdminBar />
                    
                ) : (<NavBar />)}
                
                <Routes>
                    {isAdmin && (
                        <>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/addAdmin" element={<Admin />} />
                            <Route path="/venue" element={<Venue />} />
                            <Route path="/service" element={<Service />} />
                            <Route path="/acceptVendor" element={<AcceptVendor />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/bookings" element={<Booking />} />
                            <Route path="/pendingBookings" element={<PendingBooking />} />
                            
                        </>
                    )}
                    {isVendor && (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/addvenue" element={<AddVenue />} />
                            <Route path="/venues" element={<Venues />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/notverified" element={<NotVerified />} />
                            <Route path="/venueDetail/:id" element={<VenueDetail />} />
                            <Route path="/serviceDetail/:id" element={<ServiceDetail />} />
                            <Route path="/kyc" element={<KYCForm />} />
                            <Route path="/addservice" element={<AddService />} />
                        </>
                    )}
                    {isCustomer && (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/venues" element={<Venues />} />
                            <Route path="/venueDetail/:id" element={<VenueDetail />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/serviceDetail/:id" element={<ServiceDetail />} />
                            <Route path="/map" element={<Map />} />
                            <Route path="/booking" element={<Bookings/> }/>
                           
                        </>
                    )}
                    {!loggedIn && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </>
                    )}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                {isCustomer && <ManagementTab />}

                <Footer />
            </BrowserRouter>

        </>
    );
}


export default App

