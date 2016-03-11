
import _ from 'lodash'
import {
    LOADING_IMAGE_DATA,
    LOAD_IMAGE_DATA,
    SORT_IMAGES,
    ImageSortBy
} from '../actions/images-actions'

const defaultState = {
    sortBy: ImageSortBy.name,
    isAscending: true,
    isLoading: true,
    dataSet: {},
    displayedItems: [],
    excludedTags: []
}

export function imageData(state: any = defaultState, action: any = {}) {
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
            sortOperator = (v: any) => v.name.toLocaleLowerCase()
            break
    }

    return _(_.values(options.dataSet))
        .filter((img: any) => !containsSelectedTag(img.tags, options.excludedTags))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map((img: any) => img.id)
        .value()
}

function containsSelectedTag(tagList, selectedTags) {
    return _.some(tagList || [], tag => isSelectedTag(tag, selectedTags))
}

function isSelectedTag(tag, selectedTags) {
    return _.some(selectedTags || [], selectedTag => isMatchingTag(selectedTag, tag));
}

function isMatchingTag(tag1, tag2) {
    return tagCompareValue(tag1) === tagCompareValue(tag2);
}

function tagCompareValue(tag) {
    return (tag || '').toLocaleLowerCase();
}
