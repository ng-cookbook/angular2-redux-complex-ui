/// <reference path="../../../typings/browser/ambient/jasmine/index.d.ts" />

import {
    LOADING_IMAGE_DATA,
    LOAD_IMAGE_DATA,
    SORT_IMAGES,
    EXCLUDE_IMAGE_TAGS,
    ImageSortBy
} from '../../../src/app/actions/images-actions'
import {imageData} from '../../../src/app/reducers/image-data'

const testImageData = [
    {
        "id": "a",
        "fileName": "A.jpg",
        "title": "A",
        "size": 22222,
        "dateTaken": "2015-01-03T00:00:00",
        "width": 200,
        "height": 300,
        "portrait": true,
        "tags": [ "aa", "bb", "cc" ]
    },
    {
        "id": "b",
        "fileName": "B.jpg",
        "title": "B",
        "size": 33333,
        "dateTaken": "2015-01-01T00:00:00",
        "width": 300,
        "height": 200,
        "landscape": true,
        "tags": [ "cc", "dd" ]
    },
    {
        "id": "c",
        "fileName": "C.jpg",
        "title": "C",
        "size": 11111,
        "dateTaken": "2015-01-02T00:00:00",
        "width": 300,
        "height": 200,
        "landscape": true,
        "tags": [ "aa", "dd", "ee" ]
    }
]

const initialDefaultState = {
    sortBy: ImageSortBy.title,
    isAscending: true,
    isLoading: true,
    dataSet: {},
    displayedItems: [],
    excludedTags: []
}

const initialLoadedState = {
    sortBy: ImageSortBy.title,
    isAscending: true,
    isLoading: false,
    dataSet: {
        a: testImageData[0],
        b: testImageData[1],
        c: testImageData[2]
    },
    displayedItems: ['a', 'b', 'c'],
    excludedTags: []
}

describe('Image Data reducer', () => {

    it('should return initial state', () => {
        let state = imageData()
        expect(state).toEqual(initialDefaultState)
    })

    it('should pass through unknown action', () => {
        let state = imageData(initialDefaultState, {
            type: 'SOME_UNKNOWN_ACTION'
        })
        expect(state).toEqual(initialDefaultState)
    })

    describe('LOADING_IMAGE_DATA action', () => {

        it('should reset to default state', () => {
            let state = imageData(initialLoadedState, {
                type: LOADING_IMAGE_DATA
            })
            expect(state).toEqual(initialDefaultState)
        })

    })

    describe('LOAD_IMAGE_DATA action', () => {

        it('should handle error', () => {
            let state = imageData(initialDefaultState, {
                type: LOAD_IMAGE_DATA,
                payload: {
                    message: 'err msg'
                },
                error: true
            })
            expect(state).toEqual(Object.assign({}, initialDefaultState, {
                isLoading: false,
                errorMessage: 'err msg'
            }))
        })

        it('should load and sort data', () => {
            let state = imageData(initialDefaultState, {
                type: LOAD_IMAGE_DATA,
                payload: testImageData
            })
            expect(state).toEqual(initialLoadedState)
        })

    })

    describe('SORT_IMAGES action', () => {

        it('should sort by title ascending', () => {
            let state = imageData(initialLoadedState, {
                type: SORT_IMAGES,
                payload: {
                    sortBy: ImageSortBy.title,
                    isAscending: true
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                sortBy: ImageSortBy.title,
                isAscending: true,
                displayedItems: ['a', 'b', 'c']
            }));
        })

        it('should sort by title descending', () => {
            let state = imageData(initialLoadedState, {
                type: SORT_IMAGES,
                payload: {
                    sortBy: ImageSortBy.title,
                    isAscending: false
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                sortBy: ImageSortBy.title,
                isAscending: false,
                displayedItems: ['c', 'b', 'a']
            }));
        })

        it('should sort by date ascending', () => {
            let state = imageData(initialLoadedState, {
                type: SORT_IMAGES,
                payload: {
                    sortBy: ImageSortBy.date,
                    isAscending: true
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                sortBy: ImageSortBy.date,
                isAscending: true,
                displayedItems: ['b', 'c', 'a']
            }));
        })

        it('should sort by date descending', () => {
            let state = imageData(initialLoadedState, {
                type: SORT_IMAGES,
                payload: {
                    sortBy: ImageSortBy.date,
                    isAscending: false
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                sortBy: ImageSortBy.date,
                isAscending: false,
                displayedItems: ['a', 'c', 'b']
            }));
        })

        it('should sort by size ascending', () => {
            let state = imageData(initialLoadedState, {
                type: SORT_IMAGES,
                payload: {
                    sortBy: ImageSortBy.size,
                    isAscending: true
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                sortBy: ImageSortBy.size,
                isAscending: true,
                displayedItems: ['c', 'a', 'b']
            }));
        })

        it('should sort by size descending', () => {
            let state = imageData(initialLoadedState, {
                type: SORT_IMAGES,
                payload: {
                    sortBy: ImageSortBy.size,
                    isAscending: false
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                sortBy: ImageSortBy.size,
                isAscending: false,
                displayedItems: ['b', 'a', 'c']
            }));
        })

    })

    describe('EXCLUDE_IMAGE_TAGS action', () => {

        it('should exclude no images', () => {
            let state = imageData(initialLoadedState, {
                type: EXCLUDE_IMAGE_TAGS,
                payload: {
                    excludedTags: []
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                displayedItems: ['a', 'b', 'c'],
                excludedTags: []
            }));
        })

        it('should exclude all images', () => {
            let state = imageData(initialLoadedState, {
                type: EXCLUDE_IMAGE_TAGS,
                payload: {
                    excludedTags: ['aa', 'bb', 'cc', 'dd', 'ee']
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                displayedItems: [],
                excludedTags: ['aa', 'bb', 'cc', 'dd', 'ee']
            }));
        })

        it('should exclude some images', () => {
            let state = imageData(initialLoadedState, {
                type: EXCLUDE_IMAGE_TAGS,
                payload: {
                    excludedTags: ['cc', 'dd']
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                displayedItems: ['a', 'c'],
                excludedTags: ['cc', 'dd']
            }));
        })

    })

})
