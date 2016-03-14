/// <reference path="../../../typings/browser/ambient/jasmine/index.d.ts" />

import {
    LOADING_IMAGE_DATA,
    LOAD_IMAGE_DATA,
    SORT_IMAGES,
    EXCLUDE_IMAGE_TAGS,
    CHANGE_LAYOUT,
    ImageSortBy,
    LayoutModes,
    loadingImages,
    loadImageData,
    loadImageDataError,
    sortImages,
    excludeImageTags,
    imageDataRequest,
    changeLayout
} from '../../../src/app/actions/images-actions'
import {imageData} from '../../../src/app/reducers/image-data'

describe('Image actions creators', () => {

    describe('loadingImages', () => {

        it('should create LOADING_IMAGE_DATA action', () => {
            let action = loadingImages();
            expect(action).toEqual({
                type: LOADING_IMAGE_DATA
            })
        })

    })

    describe('loadImageData', () => {

        it('should create LOAD_IMAGE_DATA action', () => {
            let action = loadImageData(['a', 'b', 'c']);
            expect(action).toEqual({
                type: LOAD_IMAGE_DATA,
                payload: ['a', 'b', 'c']
            })
        })

    })

    describe('loadImageDataError', () => {

        it('should create LOAD_IMAGE_DATA action with error information', () => {
            let action = loadImageDataError('some error msg');
            expect(action).toEqual({
                type: LOAD_IMAGE_DATA,
                payload: {
                    message: 'some error msg'
                },
                error: true
            })
        })

    })

    describe('sortImages', () => {

        it('should create SORT_IMAGES action', () => {
            let action = sortImages(ImageSortBy.date, false)
            expect(action).toEqual({
                type: SORT_IMAGES,
                payload: {
                    sortBy: ImageSortBy.date,
                    isAscending: false
                }
            })
        })

    })

    describe('excludeImageTags', () => {

        it('should create EXCLUDE_IMAGE_TAGS action', () => {
            let action = excludeImageTags(['a', 'b', 'c'])
            expect(action).toEqual({
                type: EXCLUDE_IMAGE_TAGS,
                payload: {
                    excludedTags: ['a', 'b', 'c']
                }
            })
        })

    })

    describe('changeLayout', () => {

        it('should create CHANGE_LAYOUT action', () => {
            let action = changeLayout(LayoutModes.listGroup)
            expect(action).toEqual({
                type: CHANGE_LAYOUT,
                payload: {
                    layoutMode: LayoutModes.listGroup
                }
            })
        })

    })

})
