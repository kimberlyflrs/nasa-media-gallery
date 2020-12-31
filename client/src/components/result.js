import React, { useContext, useEffect } from 'react';
import ResultContext from '../context/resultContext/ResultContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";
import ImageInfo from "./imageInfo.js";

const Result = props => {
    const resultContext = useContext(ResultContext);

    //display number of results for query
    //on image hover add a drop shadow
    //add center

    //pass the collection to each image
    useEffect(()=>{
        console.log(resultContext.collection)
    })

    const filterResult =()=>{
        //filters the search results according to the filters checked off
    }

    const sortResult=()=>{
        //sorts the results according to the selection
    }


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
                    <ImageInfo/>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default Result;