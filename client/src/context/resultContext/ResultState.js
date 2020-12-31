import React, {useReducer} from "react";
import ResultContext from "./ResultContext";
import ResultReducer from "./ResultReducer";
import {SEARCH_SUCCESS} from "./types.js";

const ResultState = props =>{
    const initialState = {
        query: "",
        collection: [],
        error: ""
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
            errorMessage
        }}>
            {props.children}
    </ResultContext.Provider>
    )
};

export default ResultState;