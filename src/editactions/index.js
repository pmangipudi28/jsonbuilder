const SELECTED_NODE_FETCH_JSON_REQUEST = 'SELECTED_NODE_FETCH_JSON_REQUEST'
const SELECTED_NODE_FETCH_JSON_SUCCESS = 'SELECTED_NODE_FETCH_JSON_SUCCESS'
const SELECTED_NODE_FETCH_JSON_FAILURE = 'SELECTED_NODE_FETCH_JSON_FAILURE'
const SELECTED_NODE_CLEAR_JSON = 'SELECTED_NODE_CLEAR_JSON'
const SELECTED_NODE_UPDATING_JSON = 'SELECTED_NODE_UPDATING_JSON'
const SELECTED_NODE_UPDATE_JSON = 'SELECTED_NODE_UPDATE_JSON'
const SELECTED_NODE_SEARCH_JSON = 'SELECTED_NODE_SEARCH_JSON'

export const selected_node_fetch_json_request = () => {
    return {
        type: SELECTED_NODE_FETCH_JSON_REQUEST
    }
}

export const selected_node_fetch_json_success = data => {
    return {
        type: SELECTED_NODE_FETCH_JSON_SUCCESS,
        payload: data
    }
}

export const selected_node_fetch_json_failure = error => {
    return {
        type: SELECTED_NODE_FETCH_JSON_FAILURE,
        payload: error
    }
}

export const selected_node_clear_json = () => {
    return {
        type: SELECTED_NODE_CLEAR_JSON
    }
}

export const selected_node_updating_json = () => {
    return {
        type: SELECTED_NODE_UPDATING_JSON
    }
}

export const selected_node_update_json = (key, value) => { 
    return {
        type: SELECTED_NODE_UPDATE_JSON,
        key: key,
        value: value
    }
}

export const selected_node_search_json = (key, value) => { 
    return {
        type: SELECTED_NODE_SEARCH_JSON,
        key: key,
        value: value
    }
}