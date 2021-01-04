import React, { useState, useContext} from 'react';
import { Card, Row, Modal } from 'react-bootstrap';
import audioImage from "../assets/audio.png";
import ResultContext from '../context/resultContext/ResultContext';


/*To Do
- view more option in description
 */



const ImageInfo = props => {
  const resultContext = useContext(ResultContext);
  const[showModal, setShowModal] = useState(false);
  const [vidClass, setVidClass] = useState(false);
  const [audioClass, setAudioClass] = useState(false);
  const[mediaFile, setMediaFile] = useState("");

  let image="";



/*SHOWS THE MODAL */
  const onClickCard = async() =>{
    if(props.info.data[0].media_type==="video"){
      console.log("it's a video")
      image = props.info.links[0].href;
      var vid = await resultContext.searchMedia(props.info.href, "video");
      setMediaFile(vid);
      setVidClass(true);
      setAudioClass(false);
    }

    if(props.info.data[0].media_type==="audio"){
      image = props.info.href;
      var audio = await resultContext.searchMedia(props.info.href, "audio");
      setMediaFile(audio)
      setVidClass(false);
      setAudioClass(true);
  }
    if(props.info.data[0].media_type==="image"){
      setVidClass(false)
      setAudioClass(false);
  }
    setShowModal(true)
  }

  /*SETTING UP THE IMAGES*/
    if(props.info.data[0].media_type==="video"){
      image = props.info.links[0].href;
    }
    else if (props.info.data[0].media_type==="image"){
      image = props.info.links[0].href;
      var image_file = <img src={props.info.links[0].href} alt={props.info.links[0].title} className="res-image"></img>;
    }
    else{ //if audio file, use the audioImage
      image = audioImage;
    }


    /*SETTING UP KEYWORDS*/
    let keywords = props.info.data[0].keywords.map((item, index)=>{
      return <p key={index+"keyword"} className="keyword">{item}</p>
    })

    /*SETTING  UP DATE*/
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

            <Modal.Body id="info-section">
              {image_file}

              <div className={vidClass ? "show" : "hide"}>
                <video width="320" src={mediaFile} controls>Sorry, your browser doesn't support embedded videos.</video>
              </div>

              <div className={audioClass ? "show" : "hide"}>
                <audio controls id="audio_file"><source src={mediaFile} type="audio/mpeg"/>
                Your browser does not support the audio element.</audio>
              </div>

              <p>{props.info.data[0].description}<span id="dots">...</span><span id="View More"></span></p>


              <Row>
                    <p><strong>Keywords:</strong></p> {keywords}
              </Row>


              <Row>
                <p><strong>Created on:</strong>{date}</p>
              </Row>


            </Modal.Body>
          </Modal>
        </div>
    );
}

export default ImageInfo;