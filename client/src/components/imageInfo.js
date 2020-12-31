import React, { Component } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

class ImageInfo extends Component {
//pop up of the image with the information
//users can then share it with others (maybe twitter or email)
//download image


  render() {
    return (
        <div>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
    );
  }
}

export default ImageInfo;