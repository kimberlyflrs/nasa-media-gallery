import React, { useContext, useState } from 'react';
import ResultContext from '../context/resultContext/ResultContext';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import Header from "./header.js";
import ImageInfo from "./imageInfo.js";
import rocketImage from "../assets/Rocket.png";

//To-Do
/* 
- fix sort/filter to use the same collection
*/

var filterList = []; //rename fC

const Result = props => {
    const resultContext = useContext(ResultContext);
    const [numResult, setNumResult] = useState(resultContext.collection.length);
    const [collection, setCollection] = useState(resultContext.collection);
    const [sortType, setSortType] = useState("revalence");

    
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
            setNumResult(resultContext.collection.length);
            return setCollection(resultContext.collection)
        }

        var filtered = resultContext.collection.filter(item => {
            return filterList.includes(item.data[0].media_type)
        })
        setNumResult(filtered.length);
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

    const scrollTop = ()=>{
        //scrolls to the top of the screen
        window.scroll({top:0,behavior:'smooth'})

    }

    let results = collection.map((item, index) =>
        <div key= {index} className="center-card">
            <ImageInfo key={index+'res'} info={item}/>
        </div>
    )

    return (
        <div>
        <Header/>
        <Container fluid>
            <Button onClick={scrollTop} id="top-btn">
                <img src={rocketImage} alt="rocket" width="40" height="40" id="rocket"/>
            </Button>
            <Row className="center" id="results">
                <Col>
                <h2>{numResult} results found for '{resultContext.query}'</h2>
                </Col>
            </Row>

            <Row className="center" id="filter-sort">
                <Col lg={6} md={6} sm={12}>
                    <Form.Row className="form-center">
                    <h4 className="spacing">Filter </h4>
                    <Form.Check className="form-color" inline name="image" type="checkbox" label="Image" onChange={filterResult}></Form.Check>
                    <Form.Check className="form-color" inline name="video" type="checkbox" label="Video" onChange={filterResult}></Form.Check>
                    <Form.Check className="form-color" inline name="audio" type="checkbox" label="Audio" onChange={filterResult}></Form.Check>
                    </Form.Row>
                </Col>
                <Col lg={6} md={6} sm={12}>
                    <Form.Row className="form-center">
                    <h4 className="spacing">Sort By</h4>
                    <Col xs={5}>
                    <Form.Control as="select" defaultValue="Revalence" onChange={sortResult}>
                        <option value="Revalence">Revalence</option>
                        <option value="Newest">Newest to Oldest</option>
                        <option value="Oldest">Oldest to Newest</option>
                    </Form.Control>
                    </Col>
                    </Form.Row>
                </Col>
            </Row>

            <Row className="center">
                {results}
            </Row>
        </Container>
        </div>
    );
}

export default Result;