
import _ from 'lodash'
import {
    LOADING_IMAGE_DATA,
    LOAD_IMAGE_DATA,
    SORT_IMAGES,
    ImageSortBy
} from '../actions/images-actions'

const defaultState = {
    sortBy: ImageSortBy.name,
    isLoading: true,
    list: {},
    sorted: []
}

export function imageData(state = defaultState, action) {
    switch (action.type) {
        case LOADING_IMAGE_DATA:
            return Object.assign({}, defaultState)
        case LOAD_IMAGE_DATA:
            return loadImageData(state, action)
        case SORT_IMAGES:
            return sortImageData(state, action)
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

function sortImageData(state, action) {

    let images = _.values(state.list)
    let handleSort = (sortBy: ImageSortBy, sortCriteria) => {
        return Object.assign({}, state, {
            sortBy: action.payload.sortBy,
            sorted: _(images)
                .sortBy(sortCriteria)
                .map((img: any) => img.id)
                .value()
        })
    }

    switch (action.payload.sortBy) {
        case ImageSortBy.size:
            state = handleSort(ImageSortBy.size, (v: any) => v.size)
            break
        case ImageSortBy.date:
            state = handleSort(ImageSortBy.date, (v: any) => v.dateTaken)
            break
        default:
            state = handleSort(ImageSortBy.name, (v: any) => v.name.toLocaleLowerCase())
            break
    }
    return state;
}
