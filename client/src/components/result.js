import React, { useContext, useState, useEffect } from 'react';
import ResultContext from '../context/resultContext/ResultContext';
import { Form, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";
import ImageInfo from "./imageInfo.js";

//To-Do
/* 
- pass each item to the image info component[Done]
- get filter working [DONE]
- get sort by working  [DONE]
- add bootstrap (center, rows, etc)
- pagination
*/

var filterList = []; //rename fC

const Result = props => {
    const resultContext = useContext(ResultContext);
    const [numResult, setNumResult] = useState(resultContext.collection.length);
    const [collection, setCollection] = useState(resultContext.collection);

    
    const filterResult =(event)=>{
        //filters the search results according to the filters checked off
        const target = event.target;
        if(target.checked){
            filterList.push(target.name)
        }
        else{
            var index = filterList.indexOf(target.name);
            filterList.splice(index,1)
        }

        if(filterList.length===0){
            return setCollection(resultContext.collection)
        }

        var filtered = resultContext.collection.filter(item => {
            return filterList.includes(item.data[0].media_type)
        })
        return setCollection(filtered)

    }

    const sortResult=(event)=>{
        //sorts the results according to the selection
        console.log("i selected something")
        //get the collection and then sort it by date
        const target = event.target;
        const newList = [...collection]
        if(target.value === "Newest"){
            console.log("Sorting by newest")
            setCollection(newList.sort((a,b)=> new Date(b.data[0].date_created) - new Date(a.data[0].date_created)));
            
        }
        else{
            console.log("Sorting by oldest")
            setCollection(newList.sort((a,b)=> new Date(a.data[0].date_created) - new Date(b.data[0].date_created)));
            
        }
    }

    let results = collection.map(item =>
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
                    <Form.Control as="select" defaultValue="Newest" onChange={sortResult}>
                        <option value="Newest">Newest to Oldest</option>
                        <option value="Oldest">Oldest to Newest</option>
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