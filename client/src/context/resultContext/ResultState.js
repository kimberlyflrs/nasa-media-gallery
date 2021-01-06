import React, {useReducer} from "react";
import ResultContext from "./ResultContext";
import ResultReducer from "./ResultReducer";
import {SEARCH_SUCCESS, FILE_SEARCH_SUCCESS} from "./types.js";

const ResultState = props =>{
    const initialState = {
        query: "",
        collection: [],
        error: "",
        file_source: ""
    };

    const [state, dispatch] = useReducer(ResultReducer, initialState);

    //searches the term
    const searchQuery = async(term) =>{
        console.log("term: "+term);
        let url = 'https://images-api.nasa.gov/search?q='+encodeURIComponent(term); 
        
        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }

        const data = await fetch(url, options)
        .then((response) =>{
            var data = response.json();
            return data
        })
        .then(function(json){
            return json.collection.items;

        })
        .catch(error => console.log("Error: "+error))

        console.log("we're done fetching")
        console.log(data);
        dispatch({type: SEARCH_SUCCESS, payload: data, query: term});
    }


        //searches the media of a video or audio file
        const searchMedia = async(ref, media_type) =>{
            console.log("ref: "+ref);
            const options = {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }
            const data = await fetch(ref, options)
            .then((response) =>{
                var data = response.json();
                return data
            })
            .then(function(json){
                //retrieve the first video/audio file ending in .mp4 or .mp3
                var files;
                if(media_type==="video"){
                    files = json.filter(item => {
                        var regex = /(orig)\.(mp4)$/
                        return regex.test(item)
                    })
                }
                else{//audio
                    files = json.filter(item => {
                        var regex = /.(mp3)$/
                        return regex.test(item)
                    })
                }
                console.log(files);
                return files[0];
    
            })
            .catch(error => console.log("Error: "+error))
    
            console.log("we're done fetching file search")
            return data
            //dispatch({type: FILE_SEARCH_SUCCESS, payload: data});
        }

    //error message
    const errorMessage = ()=>{
        console.log("there is an error");
    }



return (
    <ResultContext.Provider
        value={{
            query: state.query,
            collection: state.collection,
            error: state.error,
            searchQuery,
            searchMedia,
            errorMessage
        }}>
            {props.children}
    </ResultContext.Provider>
    )
};

export default ResultState;