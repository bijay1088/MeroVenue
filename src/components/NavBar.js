import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Mero Venue</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            {' '}
                            <Link className="text-decoration-none text-white" to="/">
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            {' '}
                            <Link className="text-decoration-none text-white" to="/about">
                                About
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            {' '}
                            <Link className="text-decoration-none text-white" to="/contact">
                                Contact Us
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <Link className="btn btn-primary" to="/login">
                                Login
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}