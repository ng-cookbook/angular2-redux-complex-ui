
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
} from '../../../src/app/actions/image-list-actions'
import {imageData} from '../../../src/app/reducers/image-list'

const testImageData = [
    {
        'id': 'a',
        'fileName': 'A.jpg',
        'title': 'A',
        'size': 22222,
        'dateTaken': '2015-01-03T00:00:00',
        'width': 200,
        'height': 300,
        'portrait': true,
        'tags': [ 'aa', 'bb', 'cc' ]
    },
    {
        'id': 'b',
        'fileName': 'B.jpg',
        'title': 'B',
        'size': 33333,
        'dateTaken': '2015-01-01T00:00:00',
        'width': 300,
        'height': 200,
        'landscape': true,
        'tags': [ 'cc', 'dd' ]
    },
    {
        'id': 'c',
        'fileName': 'C.jpg',
        'title': 'C',
        'size': 11111,
        'dateTaken': '2015-01-02T00:00:00',
        'width': 300,
        'height': 200,
        'landscape': true,
        'tags': [ 'aa', 'dd', 'ee' ]
    }
]

const initialDefaultState = {
    sortBy: ImageSortBy.title,
    isAscending: true,
    isLoading: true,
    dataSet: {},
    displayedItems: [],
    excludedTags: [],
    currentImageId: null
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
    excludedTags: [],
    currentImageId: null
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

    describe('CLEAR_CURRENT_IMAGE action', () => {

        it('should clear the selected image', () => {
            let initialState = Object.assign({}, initialLoadedState, {
                currentImageId: 'abc'
            })
            let state = imageData(initialState, {
                type: CLEAR_CURRENT_IMAGE
            })
            expect(state).toEqual(initialLoadedState)
        })

    })

    describe('SELECT_CURRENT_IMAGE action', () => {

        it('should set the selected image id', () => {
            let state = imageData(initialLoadedState, {
                type: SELECT_CURRENT_IMAGE,
                payload: {
                    imageId: 'b'
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                currentImageId: 'b'
            }))
        })

        it('should set null for invalid image id', () => {
            let state = imageData(initialLoadedState, {
                type: SELECT_CURRENT_IMAGE,
                payload: {
                    imageId: 'unknown'
                }
            })
            expect(state).toEqual(Object.assign({}, initialLoadedState, {
                currentImageId: null
            }))
        })

    })

    describe('CHANGE_IMAGE_TITLE action', () => {

        it('should update the image title', () => {
            let state = imageData(initialLoadedState, {
                type: CHANGE_IMAGE_TITLE,
                payload: {
                    imageId: 'b',
                    title: 'Changed Title'
                }
            })
            let expected = Object.assign({}, initialLoadedState, {
                dataSet: Object.assign({}, initialLoadedState.dataSet, {
                    b: Object.assign({}, initialLoadedState.dataSet.b, {
                        title: 'Changed Title'
                    })
                }),
                displayedItems: ['a', 'c', 'b']
            })
            //console.log(JSON.stringify(state, null, 2))
            //console.log(JSON.stringify(expected, null, 2))
            expect(state).toEqual(expected)
        })

        it('should not update the image title for an unknown id', () => {
            let state = imageData(initialLoadedState, {
                type: CHANGE_IMAGE_TITLE,
                payload: {
                    imageId: 'unknown',
                    title: 'Changed Title'
                }
            })
            let expected = initialLoadedState
            expect(state).toEqual(expected)
        })

        it('should not update the image title for an empty title', () => {
            let state = imageData(initialLoadedState, {
                type: CHANGE_IMAGE_TITLE,
                payload: {
                    imageId: 'unknown',
                    title: ''
                }
            })
            let expected = initialLoadedState
            expect(state).toEqual(expected)
        })

    })

    describe('UPDATE_IMAGE_TAGS action', () => {

        it('should update the image tags', () => {
            let state = imageData(initialLoadedState, {
                type: UPDATE_IMAGE_TAGS,
                payload: {
                    imageId: 'b',
                    tags: ['x', 'y', 'z']
                }
            })
            let expected = Object.assign({}, initialLoadedState, {
                dataSet: Object.assign({}, initialLoadedState.dataSet, {
                    b: Object.assign({}, initialLoadedState.dataSet.b, {
                        tags: ['x', 'y', 'z']
                    })
                })
            })
            expect(state).toEqual(expected)
        })

        it('should not update the image tags for an unknown id', () => {
            let state = imageData(initialLoadedState, {
                type: UPDATE_IMAGE_TAGS,
                payload: {
                    imageId: 'unknown',
                    tags: ['x', 'y', 'z']
                }
            })
            let expected = initialLoadedState
            expect(state).toEqual(expected)
        })

        it('should clear the image tags for an empty tag list', () => {
            let state = imageData(initialLoadedState, {
                type: UPDATE_IMAGE_TAGS,
                payload: {
                    imageId: 'b',
                    tags: null
                }
            })
            let expected = Object.assign({}, initialLoadedState, {
                dataSet: Object.assign({}, initialLoadedState.dataSet, {
                    b: Object.assign({}, initialLoadedState.dataSet.b, {
                        tags: []
                    })
                })
            })
            expect(state).toEqual(expected)
        })

    })

})
