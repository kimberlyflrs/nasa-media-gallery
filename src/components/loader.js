import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import LoaderGif from '../assets/loading.gif';
import ResultContext from '../context/resultContext/ResultContext';

const Loader = ()=> {
    const resultContext = useContext(ResultContext);

  
    return (
        <div className={resultContext.isLoading ? "show" : "hide"}>
        <Row className="margin-10">
            <img className="loader" src={LoaderGif} alt="Results loading" width="50" height="50"/>
        </Row>
        </div>
    );
}

export default Loader;