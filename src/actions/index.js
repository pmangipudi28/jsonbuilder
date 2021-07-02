const FETCH_JSON_REQUEST = 'FETCH_JSON_REQUEST'
const FETCH_JSON_SUCCESS = 'FETCH_JSON_SUCCESS'
const FETCH_JSON_FAILURE = 'FETCH_JSON_FAILURE'
const CLEAR_JSON = 'CLEAR_JSON'
const UPDATING_JSON = 'UPDATING_JSON'
const UPDATE_JSON = 'UPDATE_JSON'
const SAVE_JSON_SCHEMA = 'SAVE_JSON_SCHEMA';
const SAVE_JSON_SCHEMA_STATUS = 'SAVE_JSON_SCHEMA_STATUS';
const SAVE_TEMP_JSON = "SAVE_TEMP_JSON"; // Temporary JSON for Validation
const SAVE_CODE_JSON = "SAVE_CODE_JSON"; // Temporary JSON for Validation
const NOT_PROPER_JSON = "NOT_PROPER_JSON";
const SELECTED_NODE_JSON = 'SELECTED_NODE_JSON'
const SET_TEMP_JSON_VALUE = 'SET_TEMP_JSON_VALUE'
const REMOVE_JSON = 'REMOVE_JSON'
const SAVE_JSON_SCHEMA_READONLY = 'SAVE_JSON_SCHEMA_READONLY';
const REMOVE_OBJECT_JSON = 'REMOVE_OBJECT_JSON'
const REMOVE_NODE_JSON = 'REMOVE_NODE_JSON'
const ADD_NODE_JSON = 'ADD_NODE_JSON'
const ADD_OBJECT_JSON = 'ADD_OBJECT_JSON'
const FETCH_JSON_RETURN = 'FETCH_JSON_RETURN'
const UNDO_JSON = 'UNDO_JSON'
const REDO_JSON = 'REDO_JSON'
const UPDATE_SELECTED_NODE = 'UPDATE_SELECTED_NODE'


export const fetch_json_request = () => {
    return {
        type: FETCH_JSON_REQUEST
    }
}

export const fetch_json_return = () => {
    return {
        type: FETCH_JSON_RETURN
    }
}

export const fetch_json_success = data => {
    return {
        type: FETCH_JSON_SUCCESS,
        payload: data
    }
}

export const fetch_json_failure = error => {
    return {
        type: FETCH_JSON_FAILURE,
        payload: error
    }
}

export const clear_json = () => {
    return {
        type: CLEAR_JSON
    }
}

export const set_temp_json = () => {
    return {
        type: SET_TEMP_JSON_VALUE
    }
}

export const updating_json = () => {
    return {
        type: UPDATING_JSON
    }
}

export const update_json = (data, path, key, json) => { 
    return {
        type: UPDATE_JSON,
        payload: data,
        path: path,
        key: key,
        json: json
    }
}

export const update_selected_node = (data, path, key, json) => { 
    return {
        type: UPDATE_SELECTED_NODE,
        payload: data
    }
}

export const add_object_json = (data, path, jsonToAdd, typeOfObject) => { 
    return {
        type: ADD_OBJECT_JSON,
        payload: data,
        path: path,
        jsonToAdd: jsonToAdd,
        typeOfObject: typeOfObject
    }
}

export const add_node_json = (data, path, jsonToAdd) => { 
    return {
        type: ADD_NODE_JSON,
        payload: data,
        path: path,
        jsonToAdd: jsonToAdd
    }
}

export const remove_object_json = (data, path) => { 
    return {
        type: REMOVE_OBJECT_JSON,
        payload: data,
        path: path
    }
}

export const remove_node_json = (data, path) => { 
    return {
        type: REMOVE_NODE_JSON,
        payload: data,
        path: path
    }
}

export const selected_node_json = (selectedNodeData) => { 
    return {
        type: SELECTED_NODE_JSON,
        selectedNodeData: selectedNodeData
    }
}

export const save_json_schema = data => {
    return {
        type: SAVE_JSON_SCHEMA,
        payload: data
    }
}
export const save_json_schema_status = data => { 
    return {
        type: SAVE_JSON_SCHEMA_STATUS,
        payload: data
    }
}

export const save_code_json = data => {
    return {
        type: SAVE_CODE_JSON,
        payload: data
    }
}

export const save_temp_json = (data) => {
    return {
        type: SAVE_TEMP_JSON,
        payload: data

    }
}
export const not_proper_json = () => {
    return {
        type: NOT_PROPER_JSON,
        properJSON: false
    }
}
export const save_json_schema_readonly = data => {
    return {
        type: SAVE_JSON_SCHEMA_READONLY,
        payload: data
    }
}

export const undo = () => {
    return {
        type: UNDO_JSON
    }
}

export const redo = () => {
    return {
        type: REDO_JSON
    }
}