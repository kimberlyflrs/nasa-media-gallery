import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Home extends Component {
//search bar, search button
//when button click call the api
//add additional parameter for year search
constructor(props){
  super(props);
  this.state = {
    searchQuery: ""
  };
  this.searchQuery = this.searchQuery.bind(this);
}


async searchQuery(){
    //calls the api to look for the query
    //query by date
    //title
     /*
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
*/
    console.log("Let's search now");
    console.log(this.state.searchQuery);
    try{
      const res = await axios.get('/query', 
      {query: this.state.searchQuery}, 
      {headers: {
        'Content-Type': 'application/json'}
    })
    }
    catch(e){
      console.log(e);
    }
    //once results are done, go to the result page
    //return <Redirect to="/results" /> //have a true, false
}

  render() {
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
                        <Form.Control name="query" placeholder="Search through thousands of images" onChange={e => this.setState({searchQuery: e.target.value})}/>
                    </Form>
                </Col>
                <Col lg={4} md={12} sm={12}>
                <Button variant="primary" type="submit" onClick={this.searchQuery}>
                    Search
                </Button>
                </Col>
            </Row>
            </div>
        </Container>
        </div>
    );
  }
}

export default Home;