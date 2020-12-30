import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";
import axios from 'axios';
import {Redirect} from 'react-router-dom';


var result = "";
class Home extends Component {
//search bar, search button
//when button click call the api
//add additional parameter for year search
constructor(props){
  super(props);
  this.state = {
    searchQuery: "",
    navResults: false,
    collection: ""
  };
  this.searchQuery = this.searchQuery.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.makeSearch = this.makeSearch.bind(this);
}


handleInputChange(e){
  this.setState({
      searchQuery: e.target.value
  })
}


searchQuery(){
    //calls the api to look for the query
    console.log("Let's search now");
    console.log(this.state.searchQuery);
    let url = 'https://images-api.nasa.gov/search?q='+encodeURIComponent(this.state.searchQuery); 
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    return fetch(url, options)
    .then((response) =>{
        var data = response.json();
        return data
      })
    .then(function(json){
        console.log("results")
        result = json.collection.items;
        return json.collection.items;

      })
    .catch(error => console.log("Error: "+error))
}

async makeSearch(){
  //calls the api function and waits for the results
  await this.searchQuery();
 /* let results = await this.searchQuery().then(function(result){
    console.log(result);
    return;
  });*/
  console.log(result);
 /* this.setState({
    collection: results,
    navResults:true
  })*/
}



  render() {
    if(this.state.navResults){
      return <Redirect to="/results" />
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
                        <Form.Control name="query" placeholder="Search through thousands of images" onChange={this.handleInputChange}/>
                    </Form>
                </Col>
                <Col lg={4} md={12} sm={12}>
                <Button variant="primary" type="submit" onClick={this.makeSearch}>
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