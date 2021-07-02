const UPDATE_JSON = 'UPDATE_JSON'
const FETCH_UPDATED_JSON_SUCCESS = 'FETCH_UPDATED_JSON_SUCCESS'

const updatedState = {
    loading: false,
    jsonData: [],
    error: '',
    updating: false
}

const updateReducer = (state = updatedState, action) => {
    
    switch(action.type) {
        case FETCH_UPDATED_JSON_SUCCESS:            
            return {  
            ...state,            
            loading: false,
            jsonData: action.payload,
            error: '',
            updating: false
            }
        case UPDATE_JSON:
            console.log("Inside Update Reducer ==== ");
            console.log(action.payload)

            const updatedJsonData = state.jsonData;

            console.log(updatedJsonData);

            return {                
                ...state,
                jsonData: action.payload
            }
            
            // return {...state, jsonData: {
            //             ...state.jsonData,
            //             [key.toString().replace("root.", "")]: value
            // }}

            // return {  
            //     ...state.jsonData,
            //     loading: false,
            //     jsonData: action.payload,
            //     error: '',
            //     updating: false
            // }
      default:
          return state;  
    }
  };
  
  export default updateReducer;