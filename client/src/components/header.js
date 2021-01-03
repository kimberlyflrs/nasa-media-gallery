import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/nasa-logo.png';

class Header extends Component {

  render() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand id="project-name">
            <img
                src={logo} 
                width="50"
                height="40"
                className="d-inline-block align-top"
                alt="NASA logo"
            />
            NASA Image Search
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;