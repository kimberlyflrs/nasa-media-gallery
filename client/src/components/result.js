import React, { useContext, useEffect } from 'react';
import ResultContext from '../context/resultContext/ResultContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";
import ImageInfo from "./imageInfo.js";

//To-Do
/* 
- pass each item to the image info component
- get filter working
- get sort by working
*/


const Result = props => {
    const resultContext = useContext(ResultContext);

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

    let results = resultContext.collection.map(item =>
        <div>
            <ImageInfo key={item.data[0].nasa_id} info={item}/>
        </div>
    )

    return (
        <div>
        <Header/>
        <Container fluid className="center">
            <Row>
                <h2>{resultContext.collection.length} results found for '{resultContext.query}'</h2>
            </Row>
            <Row>
                <Col>
                    <Form.Row>
                    <h4>Filter </h4>
                    <Form.Check inline type="checkbox" label="Image"></Form.Check>
                    <Form.Check inline type="checkbox" label="Video"></Form.Check>
                    <Form.Check inline type="checkbox" label="Audio"></Form.Check>
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
                    {results}
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default Result;