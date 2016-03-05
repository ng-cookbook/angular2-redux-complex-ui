
import {Http, Response} from 'angular2/http'

export const LOADING_IMAGE_DATA = 'LOADING_IMAGE_DATA'
export const LOAD_IMAGE_DATA = 'LOAD_IMAGE_DATA'
export const SORT_IMAGES = 'SORT_IMAGES'
export enum ImageSortBy {
    name,
    size,
    date
}

export function loadingImages() {
    return {
        type: LOADING_IMAGE_DATA
    }
}

export function loadImageData(imageData) {
    return {
        type: LOAD_IMAGE_DATA,
        payload: imageData
    }
}

export function loadImageDataError(errorMessage) {
    return {
        type: LOAD_IMAGE_DATA,
        payload: {
            message: errorMessage
        },
        error: true
    }
}

export function sortImages(sortBy: ImageSortBy) {
    return {
        type: SORT_IMAGES,
        payload: { sortBy }
    }
}

export function imageDataRequest(http: Http) {
    return dispatch => {
        dispatch(loadingImages())
        http.get('/api/images')
            .map(res => res.json())
            .map(imageData => _.map(imageData, (img: any) => Object.assign(img, {
                dateTaken: new Date(img.dateTaken)
            })))
            .subscribe(
                (imageData: any) => {
                    dispatch(loadImageData(imageData))
                    dispatch(sortImages(ImageSortBy.name))
                },
                (err: Response) => dispatch(loadImageDataError(err.json().error || 'Server error'))
            )
    }
}
