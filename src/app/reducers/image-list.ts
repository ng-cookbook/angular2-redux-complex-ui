
import _ from 'lodash'
import {
    LOADING_IMAGE_DATA,
    LOAD_IMAGE_DATA,
    SORT_IMAGES,
    EXCLUDE_IMAGE_TAGS,
    CLEAR_CURRENT_IMAGE,
    SELECT_CURRENT_IMAGE,
    CHANGE_IMAGE_TITLE,
    UPDATE_IMAGE_TAGS,
    ImageSortBy
} from '../actions/image-list-actions'
import {areAllTagsExcluded} from '../utils/tag-utils';

const defaultState = {
    sortBy: ImageSortBy.title,
    isAscending: true,
    isLoading: true,
    dataSet: {},
    displayedItems: [],
    excludedTags: [],
    currentImageId: null
}

export function imageData(state: any = defaultState, action: any = {}) {
    switch (action.type) {
        case LOADING_IMAGE_DATA:
            return Object.assign({}, defaultState)
        case LOAD_IMAGE_DATA:
            return loadImageData(state, action)
        case SORT_IMAGES:
            return sortImageData(state, action)
        case EXCLUDE_IMAGE_TAGS:
            return excludeImageTags(state, action)
        case CLEAR_CURRENT_IMAGE:
            return Object.assign({}, state, { currentImageId: null })
        case SELECT_CURRENT_IMAGE:
            return selectCurrentImage(state, action)
        case CHANGE_IMAGE_TITLE:
            return changeImageTitle(state, action)
        case UPDATE_IMAGE_TAGS:
            return updateImageTags(state, action)
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

    let dataSet = _.fromPairs(action.payload.map(img => [img.id, img]))
    return Object.assign({}, state, {
        isLoading: false,
        dataSet,
        displayedItems: getDisplayedItems({
            dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending,
            excludedTags: state.excludedTags
        })
    })
}

function sortImageData(state, action) {
    return Object.assign({}, state, {
        sortBy: action.payload.sortBy,
        isAscending: action.payload.isAscending,
        displayedItems: getDisplayedItems({
            dataSet: state.dataSet,
            sortBy: action.payload.sortBy,
            isAscending: action.payload.isAscending,
            excludedTags: state.excludedTags
        })
    })
}

function excludeImageTags(state, action) {
    return Object.assign({}, state, {
        excludedTags: action.payload.excludedTags,
        displayedItems: getDisplayedItems({
            dataSet: state.dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending,
            excludedTags: action.payload.excludedTags
        })
    })
}

function getDisplayedItems(options) {

    let sortOperator: any;
    switch (options.sortBy) {
        case ImageSortBy.size:
            sortOperator = (v: any) => v.size
            break
        case ImageSortBy.date:
            sortOperator = (v: any) => v.dateTaken
            break
        default:
            sortOperator = (v: any) => v.title.toLocaleLowerCase()
            break
    }

    return _(_.values(options.dataSet))
        .filter((img: any) => !areAllTagsExcluded(img.tags, options.excludedTags))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map((img: any) => img.id)
        .value()
}

function selectCurrentImage(state, action) {
    let imageId = action.payload.imageId;
    return Object.assign({}, state, {
        currentImageId: state.dataSet[imageId] ? imageId : null
    })
}

function changeImageTitle(state, action) {
    let imageId = action.payload.imageId;
    let title = action.payload.title;
    if (imageId && title && state.dataSet[imageId]) {
        let dataSet = Object.assign({}, state.dataSet, {
            [imageId]: Object.assign({}, state.dataSet[imageId], { title })
        })
        let displayedItems = getDisplayedItems({
            dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending,
            excludedTags: state.excludedTags
        })
        state = Object.assign({}, state, { dataSet, displayedItems })
    }
    return state;
}

function updateImageTags(state, action) {
    let imageId = action.payload.imageId;
    let tags = action.payload.tags || [];
    if (imageId && state.dataSet[imageId]) {
        let dataSet = Object.assign({}, state.dataSet, {
            [imageId]: Object.assign({}, state.dataSet[imageId], { tags })
        })
        let displayedItems = getDisplayedItems({
            dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending,
            excludedTags: state.excludedTags
        })
        state = Object.assign({}, state, { dataSet, displayedItems })
    }
    return state;
}
