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
    await resultContext.searchQuery(searchQuery);
    setNavResults(true);
  }




    if(navResults){
      var url = "/results/"+searchQuery;
      return <Redirect to={url}/>
    }
    return (
        <div>
        <Header/>
        <Container fluid>
            <div id="home-section">
            <Row className="center margin-5">
                <Col>
                  <h1>Search thousands of images, audios, and videos courtesy of the NASA API.</h1>
                </Col>
            </Row>

            <Row className="center margin-5">
                <Col lg={12} md={12} sm={12} xs={12} className="searchbar">
                    <Form className="searchbar">
                        <Form.Control name="query" placeholder="Search media files" onChange={handleInputChange}/>
                    </Form>
                </Col>
            </Row>
            <Row className="center margin-5">
                <Col lg={12} md={12} sm={12}>
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