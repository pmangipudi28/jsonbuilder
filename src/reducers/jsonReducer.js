import { desimplify } from 'simplifr';
import { update, remove, add} from 'simplifr'

import { convertToJson, RemoveParentId, searchObject, validateJson } from '../components/helper/helper';

const FETCH_JSON_REQUEST = 'FETCH_JSON_REQUEST'
const FETCH_JSON_SUCCESS = 'FETCH_JSON_SUCCESS'
const FETCH_JSON_FAILURE = 'FETCH_JSON_FAILURE'
const CLEAR_JSON = 'CLEAR_JSON'
const UPDATE_JSON = 'UPDATE_JSON'
const SAVE_JSON_SCHEMA = 'SAVE_JSON_SCHEMA';
const SAVE_JSON_SCHEMA_STATUS = 'SAVE_JSON_SCHEMA_STATUS';
const SAVE_TEMP_JSON = "SAVE_TEMP_JSON";
const SAVE_CODE_JSON = "SAVE_CODE_JSON";
const NOT_PROPER_JSON = "NOT_PROPER_JSON";
const SELECTED_NODE_JSON = 'SELECTED_NODE_JSON';
const SET_TEMP_JSON_VALUE = 'SET_TEMP_JSON_VALUE';
const REMOVE_JSON = 'REMOVE_JSON';
const SAVE_JSON_SCHEMA_READONLY = 'SAVE_JSON_SCHEMA_READONLY';
const REMOVE_OBJECT_JSON = 'REMOVE_OBJECT_JSON';
const REMOVE_NODE_JSON = 'REMOVE_NODE_JSON';
const ADD_NODE_JSON = 'ADD_NODE_JSON';
const ADD_OBJECT_JSON = 'ADD_OBJECT_JSON';
const FETCH_JSON_RETURN = 'FETCH_JSON_RETURN';
const UNDO_JSON = 'UNDO_JSON';
const REDO_JSON = 'REDO_JSON';
const UPDATE_SELECTED_NODE = 'UPDATE_SELECTED_NODE'

const initialState = {
    loading: false,
    jsonData: [],
    tempJson: [],
    jsonSchemaData: [],
    selectedNodeData: [],
    JsonSchemaStatus: 0,
    jsonSchemaReadOnlyData:[],
    error: '',
    updated: false,
    properJSON: false
}

const jsonReducer = (state = initialState, action) => {    
    switch(action.type) {
      case FETCH_JSON_REQUEST:
            return {
                ...state,
                loading: true  
            }
      case FETCH_JSON_SUCCESS:
            let payload = convertToJson(action.payload);
            let properJSONValue = false;
           
            if (state.tempJson.length > 0)
            {
                properJSONValue = false
            }
            else
            {
                properJSONValue = true
            }

            return {  
              ...state,            
              loading: false,
              jsonData: payload,
              selectedNodeData: [],
              error: '',
              updated: false,
              properJSON: properJSONValue
            }
      case SET_TEMP_JSON_VALUE:
            return {  
              ...state,            
              tempJson: [],
              properJSON: true
            }
      case FETCH_JSON_FAILURE:
            return {
                ...state,
                loading: false,
                jsonData: [],
                error: action.payload,
                updated: false
              }
      case FETCH_JSON_RETURN: 
          return {
              ...state
          } 
      case UPDATE_JSON:
            let updatedJSON = "";
            console.log("Inside Reducer .... ");
            console.log(JSON.stringify(action.json));
            console.log(action.path);

            Object.keys(action.payload).map((key, index) => {
              if (key === "root" + action.path + "." + action.key)
              {
                let data = action.payload;
                updatedJSON = update(data, "root" + action.path, action.json);
              }
            })

            return {                
              ...state,
              jsonData: desimplify(updatedJSON),
              updated: true
            }
      case ADD_OBJECT_JSON:
              
              let jsonUpdatedObjects = "";
              
              // console.log("root" + action.path);
              let dataPayload = action.payload;
              let jsonNewObject = "";

              if (action.typeOfObject === "ArrayObject")
              {
                jsonNewObject = action.jsonToAdd;
              }
              else if (action.typeOfObject === "Object")
              {
                jsonNewObject = {fields: [action.jsonToAdd]};
              }

              console.log("Path ....... " + "root" + action.path);
              console.log("jsonNewObject ....... " + JSON.stringify(jsonNewObject));

              jsonUpdatedObjects = add(dataPayload, "root" + action.path, jsonNewObject);
              //console.log(JSON.stringify(desimplify(jsonUpdatedObjects)))

              return {                
                ...state,
                jsonData: convertToJson(desimplify(jsonUpdatedObjects))
              }

      case ADD_NODE_JSON:
              
              let jsonAfterAddition = "";
              let jsonObject = {[action.jsonToAdd.newJSON.jsonKey]: action.jsonToAdd.newJSON.jsonValue};

              let dataAdd = action.payload;
              jsonAfterAddition = add(dataAdd, "root" + action.path, jsonObject);
  
              return {                
                ...state,
                jsonData: desimplify(jsonAfterAddition)
              }

      case REMOVE_OBJECT_JSON:
            let jsonAfterRemoval = "";
            
            let dataObject = action.payload;
            jsonAfterRemoval = remove(dataObject, "root" + action.path);

            return {                
              ...state,
              jsonData: desimplify(jsonAfterRemoval),
              selectedNodeData: []
            }
      case REMOVE_NODE_JSON:
            let jsonNodesAfterRemoval = "";
            
            let dataNode = action.payload;
            jsonNodesAfterRemoval = remove(dataNode, "root" + action.path);

            return {
              ...state,
              jsonData: desimplify(jsonNodesAfterRemoval)
            }      
      case SELECTED_NODE_JSON:
            return { 
              ...state,
              selectedNodeData: action.selectedNodeData
            }
      case UPDATE_SELECTED_NODE:
            return { 
              ...state,
              selectedNodeData: action.selectedNodeData
            }      
      case CLEAR_JSON:
            return {
              loading: false,
              jsonData: [],
              tempJson: [],
              jsonSchemaData: [],
              selectedNodeData: [],
              JsonSchemaStatus: 0,
              jsonSchemaReadOnlyData:[],
              
              error: '',
              updated: false,
              properJSON: false
            }
      // save json schema in redux 
      case SAVE_JSON_SCHEMA:   
        
          /*return Object.assign({}, state, {
            jsonSchemaData: state.jsonSchemaData.concat(action.payload)
          });*/
        
          return {  
            ...state,            
            loading: false,
            jsonSchemaData: action.payload,
            error: '',
            updated: false,
            jsonSchemaStatus: action.status
          }
      case SAVE_JSON_SCHEMA_STATUS:   
            return {  
              ...state,            
              loading: false,
              jsonSchemaStatus: action.payload,
              error: '',
              updated: false
            }
    case SAVE_CODE_JSON:
              let jsonPayload = convertToJson(action.payload);
              let jsonProper = false;
             
              if (state.tempJson.length > 0)
              {
                jsonProper = false
              }
              else
              {
                jsonProper = true
              }
  
              return {  
                ...state,            
                loading: false,
                jsonData: jsonPayload,
                selectedNodeData: [],
                error: '',
                updated: true,
                properJSON: jsonProper
              }      
      case SAVE_TEMP_JSON:
          return {
            ...state,            
            tempJson: action.payload,
            properJSON: false
          }
      case NOT_PROPER_JSON:
            return {
              ...state,  
              jsonData: [],
              properJSON: false
            }  
      case SAVE_JSON_SCHEMA_READONLY:
        return {
          ...state,            
          loading: false,
          jsonSchemaReadOnlyData: action.payload,
          error: '',
          updated: false
        }  
      default:
          return state;  
    }
  };
  
  export default jsonReducer;