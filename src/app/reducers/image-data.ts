
import _ from 'lodash'
import {
    LOADING_IMAGE_DATA,
    LOAD_IMAGE_DATA
} from '../actions/images-actions'

const defaultState = {
    isLoading: true,
    list: {}
}

export function imageData(state = defaultState, action) {
    switch (action.type) {
        case LOADING_IMAGE_DATA:
            return Object.assign({}, defaultState)
        case LOAD_IMAGE_DATA:
            return loadImageData(state, action)
        default:
            return state
    }
}

function loadImageData(state, action) {

    if (action.error) {
        return Object.assign({}, state, {
            isLoading: false,
            errorMessage: action.payload.message
        })
    }

    let list = _.fromPairs(action.payload.map(img => [img.id, img]))
    return Object.assign({}, state, { isLoading: false, list })
}
