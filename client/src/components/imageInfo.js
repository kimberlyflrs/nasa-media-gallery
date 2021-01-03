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
  const[mediaFile, setMediaFile] = useState("");
  //let media_file="";
  let audio = "";


  const onClickCard = async() =>{
    //shows the modal
    //search for resource here
    var media_file;
    if(props.info.data[0].media_type==="video"){
      image = props.info.links[0].href;
      var vid = await resultContext.searchMedia(props.info.href, "video");
      console.log(vid);
//      media_file = <video src={vid} controls>Sorry, your browser doesn't support embedded videos.</video>;
      setMediaFile(vid);

    }
    if(props.info.data[0].media_type==="audio"){
      image = props.info.href;
      var audio = await resultContext.searchMedia(props.info.href, "audio");
    //  media_file = <audio controls><source src="http://images-assets.nasa.gov/audio/Ep78 Apollo 1/Ep78 Apollo 1~orig.mp3" type="audio/mpeg"/>Your browser does not support the audio element.</audio>;
      setMediaFile(audio)
  }
    /*if(props.info.data.media_type==="image"){
      media_file = <img src={props.info.links[0].href} alt={props.info.links[0].title}></img>
      setMediaFile(media_file);

    }*/
    setShowModal(true)
  }


let image="";
  // if video/image use the image from the item
  if(props.info.data[0].media_type==="video"){
    image = props.info.links[0].href;
  }
  else if (props.info.data[0].media_type==="image"){
    image = props.info.links[0].href;
    var m_f = <img src={props.info.links[0].href} alt={props.info.links[0].title}></img>
  }
  //if it's an audio file, use the audioImage
  else{
    image = audioImage;
  }

  let keywords = props.info.data[0].keywords.map(item=>{
    return <p>{item}</p>
  })

  let date = new Date(props.info.data[0].date_created)
  date = date.toDateString();


    return (
        <div className="card-style" >
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
            <Modal.Body>
              {m_f}

              <video width="320" src={mediaFile} controls>Sorry, your browser doesn't support embedded videos.</video>;

              <audio controls><source src={mediaFile} type="audio/mpeg"/>
              Your browser does not support the audio element.</audio>

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