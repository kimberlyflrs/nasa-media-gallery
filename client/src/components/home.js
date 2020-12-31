import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from "./header.js";
import {Redirect} from 'react-router-dom';
import ResultContext from '../context/resultContext/ResultContext';

var results="";
const Home = props =>  {
//add additional parameter for year search
const resultContext = useContext(ResultContext);
const [searchQuery, setSearchQuery] = useState("");
const [collection, setCollection] = useState([]);
const [navResults, setNavResults] = useState(false);


  const handleInputChange = (e) =>{
  setSearchQuery( e.target.value)
  }

  const searchTerm = (searchQuery) =>{
    console.log("searching term: "+ searchQuery)
    resultContext.searchQuery(searchQuery);
  }

  const search = () =>{
    //calls the api to look for the query
    console.log("Let's search now");
    console.log(searchQuery);
    let url = 'https://images-api.nasa.gov/search?q='+encodeURIComponent(searchQuery); 
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
        results = json.collection.items;
        return json.collection.items;

      })
    .catch(error => console.log("Error: "+error))
  }

  const makeSearch = ()=>{
    //calls the api function and waits for the results
    searchTerm(searchQuery);
    //console.log(results);
    //setCollection(results);
    //setNavResults(true);
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
                <Button variant="primary" type="submit" onClick={makeSearch}>
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