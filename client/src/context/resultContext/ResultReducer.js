import {
    SEARCH_SUCCESS,
    FILE_SEARCH_SUCCESS,
    FILE_SEARCH_FAIL,
    SEARCH_FAIL,
    LOADING_STATUS
} from "./types.js";

const ResultReducer = (state, action) =>{
    switch(action.type){
        case SEARCH_SUCCESS:
            var newList = [...action.payload]
            var resultList = newList.sort((a,b)=> new Date(b.data[0].date_created) - new Date(a.data[0].date_created))
            return{
                ...state,
                query: action.query,
                collection: resultList,
                search_error: "",
                file_error: "",
                isLoading: false
            };
        case FILE_SEARCH_SUCCESS:
            return{
                ...state,
                search_error:"",
                file_error: "",
                isLoading: false
            };
        case SEARCH_FAIL:
            return{
                ...state,
                query: action.term,
                collection: [],
                search_error: action.payload,
                isLoading: false
            }
        case FILE_SEARCH_FAIL:
            return{
                ...state,
                file_error: action.payload,
                isLoading: false
            }
        case LOADING_STATUS:
                return{
                    ...state,
                    isLoading: true
                }
        default: 
            return state;
    }
};

export default ResultReducer;