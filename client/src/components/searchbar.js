import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import ResultContext from '../context/resultContext/ResultContext';
import Loader from "./loader";

const SearchBar = () =>  {
const resultContext = useContext(ResultContext);
const [searchQuery, setSearchQuery] = useState("");
const [navResults, setNavResults] = useState(false);


  const handleInputChange = (e) =>{
  setSearchQuery( e.target.value)
  }

  const searchTerm = async() =>{
    //calls the api function and waits for the results
    if(searchQuery === ""){
      return
    }
    resultContext.changeLoading();
    await resultContext.searchQuery(searchQuery);
    console.log(resultContext.isLoading);
    setNavResults(true);
  }




    if(navResults){
      var url = "/results/"+searchQuery;
      return <Redirect to={url}/>
    }
    return (
            <div>
            <Row className="center margin-10">
                <Col lg={12} md={12} sm={12} xs={12} className="searchbar">
                    <Form className="searchbar">
                        <Form.Control name="query" placeholder="Search media files" onChange={handleInputChange}/>
                    </Form>
                </Col>
            </Row>
            <Row className="center margin-10">
                <Col lg={12} md={12} sm={12}>
                <div className={resultContext.isLoading ? "hide" : "show"}>
                <Button variant="primary" type="submit" onClick={searchTerm}>
                    Search
                </Button>
                </div>
                <div className="center">
                <Loader/>
                </div>
                </Col>
            </Row>
            </div>

    );
  }


export default SearchBar;