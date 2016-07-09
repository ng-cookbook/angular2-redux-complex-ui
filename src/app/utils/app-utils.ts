
import {Observable} from 'rxjs'

export interface IImageIdRouteParam {
    id: string;
}

export function waitForImageListToLoad(appStoreSource: Observable<any>): Observable<any> {
    return appStoreSource
        .filter((state: any) => !state.imageData.isLoading)
        .take(1)
}

export function watchForImageIdChanges(routeParams: Observable<any>): Observable<string> {
    return routeParams
        .map((params: IImageIdRouteParam) => params.id)
}
