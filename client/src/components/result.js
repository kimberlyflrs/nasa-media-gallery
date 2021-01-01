import React, { useContext, useState } from 'react';
import ResultContext from '../context/resultContext/ResultContext';
import { Form, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";
import ImageInfo from "./imageInfo.js";

//To-Do
/* 
- pass each item to the image info component
- get filter working
- get sort by working
- add bootstrap (center, rows, etc)
- pagination
*/

var fC = [];

const Result = props => {
    const resultContext = useContext(ResultContext);
    const [numResult, setNumResult] = useState(resultContext.collection.length);
    const [collection, setCollection] = useState(resultContext.collection);
    const [filterList, setFilterList] = useState(resultContext.collection);

    const filterResult =(event)=>{
        //filters the search results according to the filters checked off
        const target = event.target;
        if(target.checked){
            fC.push(target.name)
        }
        else{
            var index = fC.indexOf(target.name);
            fC.splice(index,1)
        }
        console.log("i selected a check box")
        console.log(fC);

        if(fC.length===0){
            console.log(collection)
            return setFilterList(collection)
        }

        var filtered = resultContext.collection.filter(item => {
            return fC.includes(item.data[0].media_type)
        })
        console.log(filtered)
        return setFilterList(filtered)

    }

    const sortResult=(event)=>{
        //sorts the results according to the selection
        console.log("i selected something")
        //get the collection and then sort it by date

    }

    let results = filterList.map(item =>
        <div>
            <ImageInfo key={item.data[0].nasa_id} info={item}/>
        </div>
    )

    return (
        <div>
        <Header/>
        <Container fluid className="center">
            <Row>
                <h2>{numResult} results found for '{resultContext.query}'</h2>
            </Row>
            <Row>
                <Col>
                    <Form.Row>
                    <h4>Filter </h4>
                    <Form.Check inline name="image" type="checkbox" label="Image" onChange={filterResult}></Form.Check>
                    <Form.Check inline name="video" type="checkbox" label="Video" onChange={filterResult}></Form.Check>
                    <Form.Check inline name="audio" type="checkbox" label="Audio" onChange={filterResult}></Form.Check>
                    </Form.Row>
                </Col>
                <Col>
                    <Form.Row>
                    <h4>Sort By</h4>
                    <Col xs={5}>
                    <Form.Control as="select" defaultValue="Choose..." onChange={sortResult}>
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