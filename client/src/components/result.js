import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";

class Result extends Component {
//display number of results for query
//on image hover add a drop shadow
//add center


  render() {
    return (
        <div>
        <Header/>
        <Container fluid className="center">
            <Row>
                <h2>XXXX results found for XXXXX</h2>
            </Row>
            <Row>
                <Col>
                    <Form.Row>
                    <h4>Filter </h4>
                    <Form.Check inline type="checkbox" label="Image"></Form.Check>
                    <Form.Check inline type="checkbox" label="Video"></Form.Check>
                    </Form.Row>
                </Col>
                <Col>
                    <Form.Row>
                    <h4>Sort By</h4>
                    <Col xs={5}>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Newest to Oldest</option>
                        <option>Oldest to Newest</option>
                    </Form.Control>
                    </Col>
                    </Form.Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    Images here
                </Col>
            </Row>
        </Container>
        </div>
    );
  }
}

export default Result;