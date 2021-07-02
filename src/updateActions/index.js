const UPDATE_JSON = 'UPDATE_JSON'
const FETCH_UPDATED_JSON_SUCCESS = 'FETCH_UPDATED_JSON_SUCCESS'

export const update_json = data => { 
    return {
        type: UPDATE_JSON,
        payload: data
    }
}

export const fetch_updated_json_success = data => {
    return {
        type: FETCH_UPDATED_JSON_SUCCESS,
        payload: data
    }
}