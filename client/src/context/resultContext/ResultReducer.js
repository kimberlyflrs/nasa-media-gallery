import {
    SEARCH_SUCCESS,
    FILE_SEARCH_SUCCESS,
    SEARCH_FAIL,
    CLEAR_ERROR
} from "./types.js";

const ResultReducer = (state, action) =>{
    switch(action.type){
        case SEARCH_SUCCESS:
            console.log("search success");
            var newList = [...action.payload]
            var resultList = newList.sort((a,b)=> new Date(b.data[0].date_created) - new Date(a.data[0].date_created))
            return{
                ...state,
                query: action.query,
                collection: resultList
            };
        case FILE_SEARCH_SUCCESS://fix this
            return{
                ...state,
                file_source: action.payload
            };
        case SEARCH_FAIL:
            return{
                ...state,
                query: action.payload.term,
                collection: [],
                error: action.payload.error
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error:""
            }
        default: 
            return state;
    }
};

export default ResultReducer;