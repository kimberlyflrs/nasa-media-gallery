import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";

class Home extends Component {
//search bar, search button
//when button click call the api

searchQuery(){
    //calls the api to look for the query
    //query by date
    //title
     /* componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
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
                        <Form.Control name="query" placeholder="Search through thousands of images"/>
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