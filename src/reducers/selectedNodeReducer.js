const SELECTED_NODE_FETCH_JSON_REQUEST = 'SELECTED_NODE_FETCH_JSON_REQUEST'
const SELECTED_NODE_FETCH_JSON_SUCCESS = 'SELECTED_NODE_FETCH_JSON_SUCCESS'
const SELECTED_NODE_FETCH_JSON_FAILURE = 'SELECTED_NODE_FETCH_JSON_FAILURE'
const SELECTED_NODE_CLEAR_JSON = 'SELECTED_NODE_CLEAR_JSON'
const SELECTED_NODE_UPDATING_JSON = 'SELECTED_NODE_UPDATING_JSON'
const SELECTED_NODE_SEARCH_JSON = 'SELECTED_NODE_SEARCH_JSON'

const initialNodeState = {
      loading: false,
      selectedNodeData: [],
      error: '',
      updating: false
}

const selectedNodeReducer = (state = initialNodeState, action) => {    
    switch(action.type) {
      case SELECTED_NODE_FETCH_JSON_REQUEST:
          return {
              ...state,
              loading: true  
          }          
      case SELECTED_NODE_FETCH_JSON_SUCCESS:            
            return { 
              ...state,            
              loading: false,
              selectedNodeData: action.payload,
              error: '',
              updating: false
            }
      case SELECTED_NODE_FETCH_JSON_FAILURE:
        return {
            ...state,
            loading: false,
            selectedNodeData: [],
            error: action.payload,
            updating: false
          }
      case SELECTED_NODE_UPDATING_JSON:
        return {
            ...state,
            updating: true
          }
      case SELECTED_NODE_CLEAR_JSON:
          return {
            loading: false,
            selectedNodeData: [],
            error: '',
            updating: false
          }
      case SELECTED_NODE_SEARCH_JSON:
            return {
              ...state,
              selectedNodeData: Object.keys(state).find(key => state[key] === action.payload),
              updating: false
            }    
      default:
          return state;  
    }
  };
  
  export default selectedNodeReducer;