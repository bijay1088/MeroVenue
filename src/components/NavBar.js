import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
    const loggedIn = window.localStorage.getItem('loggedIn');
    const vendor = window.localStorage.getItem('isVendor');
    const customer = window.localStorage.getItem('isCustomer');
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
                            <NavLink className="text-decoration-none  navbar-tab" to="/" activeClassName="active-navlink">
                                Home
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            {' '}
                            <NavLink className="text-decoration-none  navbar-tab" to="/venues" activeClassName="active-navlink">
                                Venues
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            {' '}
                            <NavLink className="text-decoration-none  navbar-tab" to="/services" activeClassName="active-navlink">
                                Services
                            </NavLink>
                        </Nav.Link>
                        {vendor ? (
                            <>
                                <Nav.Link>
                                    {' '}
                                    <NavLink className="text-decoration-none  navbar-tab" to="/addvenue" activeClassName="active-navlink">
                                        Add Venue
                                    </NavLink>
                                </Nav.Link>
                                <Nav.Link>
                                    {' '}
                                    <NavLink className="text-decoration-none  navbar-tab" to="/addservice" activeClassName="active-navlink">
                                        Add Service
                                    </NavLink>
                                </Nav.Link>
                            </>
                        ) : null}
                    </Nav>
                    <Nav>
                        {customer ? (
                            <Nav.Link>
                                {' '}
                                <NavLink className="text-decoration-none  navbar-tab" to="/" activeClassName="active-navlink">
                                    Bookings
                                </NavLink>
                            </Nav.Link>
                        ) : null}

                        &nbsp;&nbsp;&nbsp;
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
