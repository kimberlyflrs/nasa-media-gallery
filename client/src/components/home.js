import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";
import SearchBar from "./searchbar.js";


const Home = () =>  {
    return (
        <div>
        <Header/>
        <Container fluid>
            <div id="home-section">
            <Row className="center margin-10">
                <Col>
                  <h1>Search thousands of images, audios, and videos courtesy of the NASA API.</h1>
                </Col>
            </Row>

            <SearchBar/>
            </div>
        </Container>
        </div>
    );
  }


export default Home;