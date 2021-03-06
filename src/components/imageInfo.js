import React, { useState, useContext} from 'react';
import { Card, Row, Modal, Button } from 'react-bootstrap';
import audioImage from "../assets/audio.png";
import ResultContext from '../context/resultContext/ResultContext';


const ImageInfo = props => {
  const resultContext = useContext(ResultContext);
  const [showModal, setShowModal] = useState(false);
  const [vidClass, setVidClass] = useState(false);
  const [audioClass, setAudioClass] = useState(false);
  const [mediaFile, setMediaFile] = useState("");
  const [descriptionClass, setDescriptionClass] = useState(false);
  const [hideBtn, setHideBtn] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);

  let image;
  let keywords;
  let description;


/*SHOWS THE MODAL */
  const onClickCard = async() =>{
    hideViewBtn();

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
    if(resultContext.file_error!==""){
      setErrorVisibility(true)
    }
    else{
      setErrorVisibility(false)
    }
    //remove the loading image
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
    try{    //check if keywords exist
      keywords = props.info.data[0].keywords.map((item, index)=>{
        return <p key={index+"keyword"} className="keyword">{item}</p>
      })
    }
    catch(e){
      keywords = ""
    }

    /*SETTING  UP DATE*/
    let date = new Date(props.info.data[0].date_created)
    date = date.toDateString();


  /*DESCRIPTION SPLITTING*/
    try{
      if(props.info.data[0].description.length>100){
      let first = props.info.data[0].description.slice(0,100);
      let second = props.info.data[0].description.slice(100);
      description = <p>
                      {first}
                      <span className={descriptionClass ? "hide" : "show"} id="dots">...</span>
                      <span className={descriptionClass ? "show" : "hide"} id="View More">{second}</span>
                    </p>
      }
      else{
      description =<p>{props.info.data[0].description}</p>
      }
    }
    catch(error){
      description = "";
    }

    const viewDescription = () =>{
      setDescriptionClass(!descriptionClass);
    }

    const hideViewBtn = () =>{
      try{
        if (props.info.data[0].description.length<100){
          setHideBtn(true)
        }
      }
      catch(error){
        setHideBtn(true);
      }
    }

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
              <p className="error-spacing"><strong>{resultContext.file_error}</strong></p>

              <div className={errorVisibility ? "hide" : "show"}>
                {image_file}

                <div className={vidClass ? "show" : "hide"}>
                  <video width="320" src={mediaFile} controls>Sorry, your browser doesn't support embedded videos.</video>
                </div>

                <div className={audioClass ? "show" : "hide"}>
                <div id="audio-container">
                  <audio controls><source src={mediaFile} type="audio/mpeg"/>
                  Your browser does not support the audio element.</audio>
                </div>
                </div>

                {description}
                <div className={ hideBtn ? "hide" : "show"} id="viewBtn">
                  <Button  className="viewbtn" onClick={viewDescription}>{descriptionClass? "View Less" : "View More"}</Button>
                </div>
              </div>

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