import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import audioImage from "../assets/audio.png";

const ImageInfo = props => {
//pop up of the image with the information
//users can then share it with others (maybe twitter or email)


let image="";
  // if video/image use the image from the item
  if((props.info.data[0].media_type==="video")|| (props.info.data[0].media_type==="image") ){
    image = props.info.links[0].href;
  }
  //if it's an audio file, use the audioImage
  else{
    image = audioImage;
  }


    return (
        <div>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>{props.info.data[0].title}</Card.Title>
            </Card.Body>
          </Card>
        </div>
    );
}

export default ImageInfo;