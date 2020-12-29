import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './header.js';

class About extends Component {

  render() {
    return (
        <div>
        <Header/>
        <Container fluid className="center">
            <div>
            <Row>
                <h1>About the Project</h1>
            </Row>

            <Row>
                <p>The project uses the NASA API to search through 
                    their image gallery according to the query.</p>
            </Row>
            </div>
        </Container>
        </div>
    );
  }
}

export default About;