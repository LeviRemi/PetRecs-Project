// Header.js

import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">PetRecs</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#link1">Link1</Nav.Link>
                <Nav.Link href="#link2">Link2</Nav.Link>
                <NavDropdown title="My Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action1</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Action2</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.3">Sign out</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#details1">Details1</Nav.Link>
                    <Nav.Link href="#details2">Details2</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header