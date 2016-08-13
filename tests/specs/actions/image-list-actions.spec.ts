
import {
    LOADING_IMAGE_DATA,
    LOAD_IMAGE_DATA,
    SORT_IMAGES,
    EXCLUDE_IMAGE_TAGS,
    CLEAR_CURRENT_IMAGE,
    SELECT_CURRENT_IMAGE,
    CHANGE_IMAGE_TITLE,
    UPDATE_IMAGE_TAGS,
    ImageSortBy,
    loadingImages,
    loadImageData,
    loadImageDataError,
    sortImages,
    excludeImageTags,
    clearCurrentImage,
    selectCurrentImage,
    changeImageTitle,
    updateImageTags
} from '../../../src/app/actions/image-list-actions'

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

    describe('clearCurrentImage', () => {

        it('should create CLEAR_CURRENT_IMAGE action', () => {
            let action = clearCurrentImage()
            expect(action).toEqual({
                type: CLEAR_CURRENT_IMAGE
            })
        })

    })

    describe('selectCurrentImage', () => {

        it('should create SELECT_CURRENT_IMAGE action', () => {
            let action = selectCurrentImage('abcxyz')
            expect(action).toEqual({
                type: SELECT_CURRENT_IMAGE,
                payload: {
                    imageId: 'abcxyz'
                }
            })
        })

    })

    describe('changeImageTitle', () => {

        it('should create CHANGE_IMAGE_TITLE action', () => {
            let action = changeImageTitle('abcxyz', 'New Title')
            expect(action).toEqual({
                type: CHANGE_IMAGE_TITLE,
                payload: {
                    imageId: 'abcxyz',
                    title: 'New Title'
                }
            })
        })

    })

    describe('updateImageTags', () => {

        it('should create UPDATE_IMAGE_TAGS action', () => {
            let action = updateImageTags('abcxyz', ['a', 'b', 'c'])
            expect(action).toEqual({
                type: UPDATE_IMAGE_TAGS,
                payload: {
                    imageId: 'abcxyz',
                    tags: ['a', 'b', 'c']
                }
            })
        })

    })

})
