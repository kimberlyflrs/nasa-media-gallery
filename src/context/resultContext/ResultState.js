import React, {useReducer} from "react";
import ResultContext from "./ResultContext";
import ResultReducer from "./ResultReducer";
import {SEARCH_SUCCESS, SEARCH_FAIL, FILE_SEARCH_SUCCESS, 
    FILE_SEARCH_FAIL, LOADING_STATUS, SORT_LIST, FILTER_LIST} from "./types.js";

const ResultState = props =>{
    const initialState = {
        query: "",
        collection: [],
        changedList: [],
        number: 0,
        search_error: "",
        file_error: "",
        isLoading: false
    };

    const [state, dispatch] = useReducer(ResultReducer, initialState);

    //searches the term
    const searchQuery = async(term) =>{
        let errorFound = false;
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
        .catch((error) => 
            errorFound = true
        )

        if(errorFound){
            dispatch({type: SEARCH_FAIL, payload: "Cannot find the term at this moment. Please try again.", query: term})
        }
        else{
            dispatch({type: SEARCH_SUCCESS, payload: data, query: term});
        }
    }


    //searches the media of a video or audio file
    const searchMedia = async(ref, media_type) =>{
        console.log("ref: "+ref);
        let errorFound = false;
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
            return files[0];

        })
        .catch(error => errorFound=true)
        if(errorFound){
            dispatch({type:FILE_SEARCH_FAIL, payload:"Cannot find file at this time"})
        }
        else{
            console.log("we're done fetching file search")
            dispatch({type: FILE_SEARCH_SUCCESS, payload: data});
            return data   
        }
    }


    const changeLoading = () =>{
        dispatch({type: LOADING_STATUS})
    }

    //sorts the list 
    const sortList = (sortType) =>{
        dispatch({type: SORT_LIST, payload: sortType});
    }

    
    //filter list
    const filterList = (filterList, sortType) =>{
        dispatch({type:FILTER_LIST, payload: filterList})
        dispatch({type: SORT_LIST, payload: sortType})
    }


return (
    <ResultContext.Provider
        value={{
            query: state.query,
            collection: state.collection,
            changedList: state.changedList,
            number: state.number,
            search_error: state.search_error,
            file_error: state.file_error,
            isLoading: state.isLoading,
            searchQuery,
            searchMedia,
            changeLoading,
            filterList,
            sortList
        }}>
            {props.children}
    </ResultContext.Provider>
    )
};

export default ResultState;