/// <reference path="../../../typings/browser/ambient/jasmine/index.d.ts" />

import {
    //LOADING_IMAGE_DATA,
    //LOAD_IMAGE_DATA,
    //SORT_IMAGES,
    ImageSortBy
} from '../../../src/app/actions/images-actions'
import {imageData} from '../../../src/app/reducers/image-data'

describe('Image Data reducer', () => {

    describe('LOADING_IMAGE_DATA', () => {

        it('should return initial state', () => {
            let defaultState = imageData()
            expect(defaultState).toEqual({
                sortBy: ImageSortBy.name,
                isAscending: true,
                isLoading: true,
                dataSet: {},
                displayedItems: [],
                excludedTags: []
            })
        })
    })

})
