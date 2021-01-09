import {
    SEARCH_SUCCESS,
    FILE_SEARCH_SUCCESS,
    FILE_SEARCH_FAIL,
    SEARCH_FAIL,
    LOADING_STATUS,
    SORT_LIST,
    FILTER_LIST
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
                changedList: resultList,
                number: resultList.length,
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
            changedList: [],
            number:0,
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


        case SORT_LIST:
            const sortList = [...state.changedList]
            if(action.payload === "Newest to Oldest"){
                //"Sorting by newest"
                sortList.sort((a,b)=> new Date(b.data[0].date_created) - new Date(a.data[0].date_created));
            }
            else{
                //"Sorting by oldest"
                sortList.sort((a,b)=> new Date(a.data[0].date_created) - new Date(b.data[0].date_created));
            }
            return{
                ...state,
                changedList: sortList,
                number: sortList.length,
                isLoading:false
            }


        case FILTER_LIST:
            if(action.payload.length===0){//no filters
                return {
                    ...state,
                    changedList: state.collection,
                    number: state.collection.length,
                    isLoading: false
                }
            }
            else{
                var filtered = state.collection.filter(item => {
                    return action.payload.includes(item.data[0].media_type)
                })
                return{
                    ...state,
                    changedList: filtered,
                    number: filtered.length,
                    isLoading: false
                }
            }
        default: 
            return state;
    }
};

export default ResultReducer;