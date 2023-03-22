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

import Venues from "./components/Venues/venues"
import VenueDetail from "./components/Venues/venueDetail"
import Map from "./components/Venues/map"

import Services from "./components/Services/services"
import ServiceDetail from "./components/Services/serviceDetail"

import AdminBar from "./components/Admins/adminPanel"
import Admin from "./components/Admins/admin"
import Venue from "./components/Admins/venue"
import Users from "./components/Admins/users"
import AcceptVendor from "./components/Admins/acceptVendor"

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
                            <Route path="/" element={<Admin />} />
                            <Route path="/venue" element={<Venue />} />
                            <Route path="/acceptVendor" element={<AcceptVendor />} />
                            <Route path="/users" element={<Users />} />
                            
                        </>
                    )}
                    {isVendor && (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/addvenue" element={<AddVenue />} />
                            <Route path="/venues" element={<Venues />} />
                            <Route path="/notverified" element={<NotVerified />} />
                            <Route path="/venueDetail/:id" element={<VenueDetail />} />
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

