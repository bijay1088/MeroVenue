import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
    const loggedIn = window.localStorage.getItem('loggedIn');
    const vendor = window.localStorage.getItem('isVendor');
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.clear();
        navigate('/');
        window.location.reload(false);
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Mero Venue</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            {' '}
                            <Link className="text-decoration-none  navbar-tab" to="/">
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            {' '}
                            <Link className="text-decoration-none  navbar-tab" to="/venues">
                                Venues
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            {' '}
                            <Link className="text-decoration-none  navbar-tab" to="/services">
                                Services
                            </Link>
                        </Nav.Link>
                        {vendor ? (
                            <><Nav.Link>
                                {' '}
                                <Link className="text-decoration-none  navbar-tab" to="/addvenue">
                                    Add Venue
                                </Link>
                            </Nav.Link><Nav.Link>
                                    {' '}
                                    <Link className="text-decoration-none  navbar-tab" to="/addservice">
                                        Add Service
                                    </Link>
                                </Nav.Link></>
                        ) : (
                            null
                        )}
                    </Nav>
                    <Nav>
                        {loggedIn ? (
                            <button onClick={logout} className="btn btn-primary">
                                Log Out
                            </button>
                        ) : (
                            <Nav.Link>
                                <Link className="btn btn-primary" to="/login">
                                    Login
                                </Link>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
