import {
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    CLEAR_ERROR
} from "./types.js";

const ResultReducer = (state, action) =>{
    switch(action.type){
        case SEARCH_SUCCESS:
            return{
                ...state,
                query: action.payload.term,
                collection: action.payload.data,
                error: ""
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