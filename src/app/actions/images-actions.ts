
import {Http, Response} from 'angular2/http'

export const LOADING_IMAGE_DATA = 'LOADING_IMAGE_DATA'
export const LOAD_IMAGE_DATA = 'LOAD_IMAGE_DATA'
export const SORT_IMAGES = 'SORT_IMAGES'
export const EXCLUDE_IMAGE_TAGS = 'EXCLUDE_IMAGE_TAGS'
export const CHANGE_LAYOUT = 'CHANGE_LAYOUT'
export enum ImageSortBy {
    name,
    size,
    date
}
export enum LayoutModes {
    list = 1,
    listGroup = 2
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

export function sortImages(sortBy: ImageSortBy, isAscending: boolean = true) {
    return {
        type: SORT_IMAGES,
        payload: { sortBy, isAscending }
    }
}

export function excludeImageTags(excludedTags: string[]) {
    return {
        type: EXCLUDE_IMAGE_TAGS,
        payload: { excludedTags }
    }
}

export function imageDataRequest(http: Http) {
    return dispatch => {
        dispatch(loadingImages())
        http.get('/api/images')
            .map(res => res.json())
            .map(imageData => imageData.map((img: any) => Object.assign(img, {
                dateTaken: new Date(img.dateTaken)
            })))
            .subscribe(
                (imageData: any) => dispatch(loadImageData(imageData)),
                (err: Response) => dispatch(loadImageDataError(err.json().error || 'Server error'))
            )
    }
}

export function changeLayout(layoutMode: LayoutModes) {
    return {
        type: CHANGE_LAYOUT,
        payload: { layoutMode }
    }
}
