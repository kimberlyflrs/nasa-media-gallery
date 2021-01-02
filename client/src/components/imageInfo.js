import React, { useState, useContext } from 'react';
import { Card, Row, Col, Modal } from 'react-bootstrap';
import audioImage from "../assets/audio.png";
import ResultContext from '../context/resultContext/ResultContext';


/*To Do
- on hover card, add a drop shadow
- pop up modal [DONE]
- add responsiveness to image
- view more option in description
 */


const ImageInfo = props => {
  const resultContext = useContext(ResultContext);
  const[showModal, setShowModal] = useState(false);

  const onClickCard = () =>{
    //shows the modal
    //search for resource here
    if(props.info.data[0].media_type==="video"){
      image = props.info.links[0].href;
      resultContext.searchMedia(props.info.href, "video");
    }
    if(props.info.data[0].media_type==="audio"){
      image = props.info.href;
      resultContext.searchMedia(props.info.href, "audio");
    }
    setShowModal(true)
  }

  /*const searchMedia = (ref, media_type)=>{
    //searches for the media of the object if video or audio
    console.log("searching for missing media at "+ref);
  }*/

let image="";
let media_file="";
  // if video/image use the image from the item
  if(props.info.data[0].media_type==="video"){
    image = props.info.links[0].href;
  }
  else if (props.info.data[0].media_type==="image"){
    image = props.info.links[0].href;
    media_file = <img src={props.info.links[0].href} alt={props.info.links[0].title}></img>
  }
  //if it's an audio file, use the audioImage
  else{
    image = audioImage;
    //searchMedia(props.info.href, "audio");
  }

  let keywords = props.info.data[0].keywords.map(item=>{
    return <p>{item}</p>
  })

  let date = new Date(props.info.data[0].date_created)
  date = date.toDateString();


    return (
        <div>
          <Card style={{ width: '18rem' }} onClick={onClickCard}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>{props.info.data[0].title}</Card.Title>
            </Card.Body>
          </Card>

          <Modal
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                {props.info.data[0].title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>...
              {media_file}
              <p>{props.info.data[0].description}</p>
              <p></p>
              {keywords}
              {date}
            </Modal.Body>
          </Modal>
        </div>
    );
}

export default ImageInfo;