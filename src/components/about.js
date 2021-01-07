import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './header.js';
import logo from '../assets/nasa-logo.png';

class About extends Component {

  render() {
    return (
        <div>
        <Header/>
        <Container fluid>
            <Row className="center" id="about-section">
                <Col>
                <h1>About the Project</h1>
                </Col>
            </Row>

            <Row className="center">
              <Col>
              <img
                src={logo} 
                width="100"
                height="90"
                className="d-inline-block align-top"
                alt="NASA logo"
            />
                <p className="about">The project uses the NASA Image and Video API to search through 
                    their media files according to the search query.</p>
                <p className="about">The project allows the user to search, filter/sort through results, and view more information
                    over each result.</p>
                <p className="about">The tool was created with React JS, React Context API, React Router,
                    NASA Image and Video API, and Bootstrap.</p>
              </Col>
            </Row>
        </Container>
        </div>
    );
  }
}

export default About;