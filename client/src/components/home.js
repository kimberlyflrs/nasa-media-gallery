import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";
import {Redirect} from 'react-router-dom';
import ResultContext from '../context/resultContext/ResultContext';

const Home = () =>  {
//add additional parameter for year search
const resultContext = useContext(ResultContext);
const [searchQuery, setSearchQuery] = useState("");
const [navResults, setNavResults] = useState(false);


  const handleInputChange = (e) =>{
  setSearchQuery( e.target.value)
  }

  const searchTerm = async() =>{
    //calls the api function and waits for the results
    console.log("searching term: "+ searchQuery)
    await resultContext.searchQuery(searchQuery);
    setNavResults(true);
  }




    if(navResults){
      return <Redirect to="/results"/>
    }
    return (
        <div>
        <Header/>
        <Container fluid className="center">
            <div id="home-section">
            <Row>
                <h1>Search through thousands of pictures courtesy of the NASA API.</h1>
            </Row>

            <Row>
                <Col lg={8} md={12} sm={12} xs={12}>
                    <Form>
                        <Form.Control name="query" placeholder="Search through thousands of images" onChange={handleInputChange}/>
                    </Form>
                </Col>
                <Col lg={4} md={12} sm={12}>
                <Button variant="primary" type="submit" onClick={searchTerm}>
                    Search
                </Button>
                </Col>
            </Row>
            </div>
        </Container>
        </div>
    );
  }


export default Home;