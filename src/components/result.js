import React, { useContext, useState } from 'react';
import ResultContext from '../context/resultContext/ResultContext';
import {withRouter} from "react-router-dom";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import Header from "./header.js";
import ImageInfo from "./imageInfo.js";
import rocketImage from "../assets/Rocket.png";


var filterList = [];
var sortType = "Newest to Oldest";


const Result = props => {
    const resultContext = useContext(ResultContext);
    const [searchQuery, setSearchQuery] = useState("");

    const onChangeFilter = (event) =>{
        const target = event.target;
        if(target.checked){
            filterList.push(target.name)
        }
        else{
            var index = filterList.indexOf(target.name);
            filterList.splice(index,1)
        }
        resultContext.filterList(filterList, sortType);
    }


    const onChangeSort = (event) =>{
        const target = event.target;
        sortType = target.value;
        resultContext.sortList(sortType) 
    }

    const scrollTop = ()=>{
        //scrolls to the top of the screen
        window.scroll({top:0,behavior:'smooth'})
    }

    const searchTerm = () =>{
        console.log(searchQuery);
        if(searchQuery === ""){
            return
          }
        resultContext.searchQuery(searchQuery);
    }

    const handleInputChange = (event) =>{
        setSearchQuery(event.target.value)
    }


    return (
        <div>
        <Header/>
        <Container fluid>
            <Button onClick={scrollTop} id="top-btn">
                <img src={rocketImage} alt="rocket" width="40" height="40" id="rocket"/>
            </Button>

            <Row className="center margin-10">
                <Col lg={9} md={12} sm={12}>
                    <Form className="searchbar">
                        <Form.Control name="query" placeholder="Search media files" onChange={handleInputChange}/>
                    </Form>
                </Col>
                <Col lg={3} md={12} sm={12}>
                <Button variant="primary" type="submit" onClick={searchTerm}>
                    Search
                </Button>
                </Col>
            </Row>
            
            <Row className="center" id="results">
                <Col>
                <p className="white">{resultContext.search_error}</p>
                <h2>{resultContext.number} results found for '{resultContext.query}'</h2>
                </Col>
            </Row>

            <Row className="center" id="filter-sort">
                <Col lg={6} md={6} sm={12}>
                    <Form.Row className="form-center">
                    <h4 className="spacing">Filter </h4>
                    <Form.Check className="form-color" inline name="image" type="checkbox" label="Image" onChange={onChangeFilter}></Form.Check>
                    <Form.Check className="form-color" inline name="video" type="checkbox" label="Video" onChange={onChangeFilter}></Form.Check>
                    <Form.Check className="form-color" inline name="audio" type="checkbox" label="Audio" onChange={onChangeFilter}></Form.Check>
                    </Form.Row>
                </Col>
                <Col lg={6} md={6} sm={12}>
                    <Form.Row className="form-center">
                    <h4 className="spacing">Sort By</h4>
                    <Col xs={5}>
                    <Form.Control as="select" defaultValue="Newest to Oldest" onChange={onChangeSort}>
                        <option value="Newest to Oldest">Newest to Oldest</option>
                        <option value="Oldest to Newest">Oldest to Newest</option>
                    </Form.Control>
                    </Col>
                    </Form.Row>
                </Col>
            </Row>

            <Row className="center">
            {resultContext.changedList.map((item, index) =>
                <div key= {index} className="center-card">
                    <ImageInfo key={index+'res'} info={item}/>
                </div>
            )}
            </Row>
        </Container>
        </div>
    );
}

export default withRouter(Result);